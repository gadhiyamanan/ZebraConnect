import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-elements";
import SendMessageFooter from "../../components/Footer/SendMessageFooter";
import auth from "../../services/authService";
import http from "../../services/httpService";
import { SCREENS } from "../../util/constants/Constants";
import apiHelper from "../apiHelper";
import { styles } from "./styles/BroadcastDetailsStyles";
import { showMessage } from "react-native-flash-message";
import { FILE_BASE_URL } from "react-native-dotenv";
import DocViewer from "../../components/DocViewer/DocViewer";
import { LOADER_COLOR } from "../../util/constants/Constants";
export default class BroadcastDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datares: "",
      broadcastmessage: [],
      broadcastFileData: [],
      messageB: "",
      loggedInUser: {},
      modalVisible: false,
      clickedDoc: "",
      isLoading: false,
    };
  }

  redirectUser(user) {
    if (user.emp_id === "" || user.emp_id === null) {
      this.props.navigation.navigate(SCREENS.LOGIN);
    }
  }

  componentWillUnmount() {
    const { route } = this.props;
    route.params.callRefresh();
  }

  componentDidMount() {
    const data = this.props.route.params.broadCast;
    this.setState({ datares: data });
    auth.getCurrentUser().then(user => {
      this.setState({ loggedInUser: user });
      this.redirectUser(user);
      this.fetechData(data.broadcast_id, user);
      if (data.broadcast_file_status && data.broadcast_file_status === "1") {
        this.fetchBroadcastFile(data.broadcast_id);
      }
    });
  }

  async fetechData(broadcast_id, user) {
    this.setState({ isLoading: true, messageB: "" });
    try {
      const broadcastListMessage = await http.get(
        apiHelper.messageBroadcast + `/` + broadcast_id + `/` + user.emp_id
      );
      this.setState({
        broadcastmessage: broadcastListMessage.data,
        isLoading: false,
      });
    } catch (error) {}
  }

  async fetchBroadcastFile(broadcast_id) {
    console.log("Fetched broadcast file", broadcast_id);
    try {
      const broadcastFile = await http.get(
        apiHelper.BroadcastFiles + `/` + broadcast_id + `/`
      );

      if (broadcastFile?.data) {
        console.log(broadcastFile.data);
        this.setState({
          broadcastFileData: broadcastFile.data,
          isLoading: false,
        });
      }
    } catch (error) {}
  }

  checkFileExtension = filename => {
    // get file extension
    let extension = filename.split(".").pop();
    if (extension === "pdf") {
      return require("../../assets/images/ic_pdf.png");
    } else if (extension === "doc" || extension === "docx") {
      return require("../../assets/images/ic_doc.png");
    } else if (
      extension === "jpg" ||
      extension === "png" ||
      extension === "jpeg"
    ) {
      return { uri: `${FILE_BASE_URL}${filename}` };
    } else {
      return require("../../assets/images/ic_unsupported.png");
    }
  };

  sendBroadmessage = async () => {
    const { datares, loggedInUser, messageB } = this.state;
    if (messageB.trim() !== "") {
      const msg = this.state.messageB;
      this.setState({ isLoading: true });
      const formData = new URLSearchParams();
      formData.append("broadcast_id", datares.broadcast_id);
      formData.append("msg", msg);
      formData.append("sender_id", loggedInUser.emp_id);

      const broadcastListMessage = await http.post(
        apiHelper.sendMessage,
        formData
      );

      showMessage({
        message: "Message Sent!",
        type: "success",
        color: "#ffffff", // text color
      });
      this.fetechData(datares.broadcast_id, loggedInUser);
    }
  };

  getData(comment) {
    if (comment !== "" && comment !== undefined) {
      return comment.replace(/<[^>]+>/g, "");
    } else {
      return "";
    }
  }

  setMessage = messageB => {
    this.setState({
      messageB,
    });
  };

  renderImage = file => {
    let path = this.checkFileExtension(file);
    return (
      <Image
        source={path}
        resizeMode="contain"
        style={styles.attachmentImage}
      />
    );
  };

  renderAttachments = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.attachmentContainer}
        onPress={() => {
          this.setState({
            modalVisible: true,
            // clickedDoc: FILE_BASE_URL + item.file,
            clickedDoc:
              "https://drive.google.com/viewerng/viewer?embedded=true&url=" +
              item.file,
          });
        }}
      >
        {this.renderImage(item.file)}
      </TouchableOpacity>
    );
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      clickedDoc: "",
    });
  };
  render() {
    const {
      datares,
      loggedInUser,
      broadcastmessage,
      messageB,
      broadcastFileData,
      modalVisible,
      clickedDoc,
      isLoading,
    } = this.state;

    const keyboardVerticalOffset = Platform.OS === "ios" ? 70 : 50;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <SafeAreaView style={styles.container}>
          {modalVisible && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.closeModal();
              }}
            >
              <DocViewer
                uri={clickedDoc}
                onPress={() => {
                  this.closeModal();
                }}
              />
            </Modal>
          )}
          {isLoading ? (
            <ActivityIndicator
              animating={true}
              style={styles.activityIndicator}
              size="large"
              color={LOADER_COLOR.COLOR}
            />
          ) : null}
          <ScrollView style={styles.fullWidth}>
            <Card style={styles.fullWidth}>
              <Card.Title>{datares.title_name}</Card.Title>
              <View style={styles.user}>
                <Text style={styles.name}>{datares.description}</Text>
              </View>
            </Card>

            {broadcastFileData.length > 0 && (
              <Card style={styles.fullWidth}>
                <Card.Title>{"Attachments"}</Card.Title>
                <FlatList
                  data={broadcastFileData}
                  renderItem={this.renderAttachments}
                  horizontal
                  style={{
                    flex: 1,
                  }}
                />
              </Card>
            )}

            <Card style={styles.fullWidth}>
              <View style={styles.user}>
                <View style={styles.container}>
                  <FlatList
                    style={styles.list}
                    data={broadcastmessage}
                    keyExtractor={item => item.id}
                    renderItem={message => {
                      const item = message.item;
                      let inMessage = item.sender_id === loggedInUser.emp_id;
                      let itemStyle = !inMessage
                        ? styles.itemIn
                        : styles.itemOut;

                      return (
                        <View style={[styles.item, itemStyle]}>
                          <View style={[styles.balloon]}>
                            <Text style={styles.senderName}>
                              {item.sender_name}
                            </Text>
                            <Text>{this.getData(item.comment)}</Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </Card>
            <View style={{ height: 60 }} />
          </ScrollView>
          <SendMessageFooter
            message={messageB}
            onChangeText={this.setMessage}
            sendBroadmessage={this.sendBroadmessage}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
