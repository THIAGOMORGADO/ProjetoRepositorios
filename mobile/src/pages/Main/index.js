/* eslint-disable react/prop-types */
// eslint-disable-next-line react/state-in-constructor
import React, { Component } from "react";
import PropType from "prop-types";
import { Keyboard, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/Ionicons";

import api from "../../services/api";

import {
  Container,
  Form,
  Input,
  SubmitButton,
  LIst,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from "./styles";

export default class Main extends Component {
  static navigationOptions = {
    title: "Usuarios",
  };

  static PropType = {
    navigation: PropType.shape({
      navigate: PropType.func,
    }).isRequered,
  };

  state = {
    newUser: "",
    users: [],
    loading: false,
  };

  async componentDidMount() {
    console.tron.log(this.props);
    const users = await AsyncStorage.getItem("users");
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem("users", JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;
    this.setState({ loading: true });
    const response = await api.get(`/users/${newUser}`);
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };
    this.setState({
      users: [...users, data],
      newUser: "",
      loading: false,
    });
    Keyboard.dismiss();
  };

  handleNavigate = (user) => {
    const { navigation } = this.props;

    navigation.navigate("User", {
      user,
    });
  };

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuario"
            value={newUser}
            onChangeText={(text) => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>
        <LIst
          data={users}
          keyExtractor={(user) => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>ver Perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
