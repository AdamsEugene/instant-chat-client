import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserBar from "../userBar/UserBar";
import SearchUser from "../userBar/SearchUser";
import Chat from "../chat/Chat";
import UserInfo from "../userInfo/UserInfo";
import FloatingActionButtons from "../userBar/FloatingButton";
import ThreeViews from "./ThreeViews";
import TwoViews from "./TwoViews";
import { instance } from "../../apis";

import io from "socket.io-client";
const ENDPORTURL = "https://instantchatserver.herokuapp.com/";
// const ENDPORTURL = "http://localhost:5050";
let socket;
const uniqueArray = (a) =>
  [...new Set(a.map((o) => JSON.stringify(o)))].map((s) => JSON.parse(s));

export default function GridView({ toggleRightSideBar, barState }) {
  const { location } = useHistory();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [messages, setMessages] = useState([]);
  const [allMyMessages, setAllMyMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [c_user, setC_user] = useState({});
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [allChatGroups, setAllChatGroups] = useState([]);
  const [groupMessages, setGroupMessages] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupName, setGroupName] = useState();

  useEffect(() => {
    socket = io(ENDPORTURL, { transports: ["websocket"], upgrade: false });
    setId(location.pathname.split("/").slice(1)[0]);

    const getUser = async () => {
      const newUser = await instance.get(
        `/user/get/${location.pathname.split("/").slice(1)[0]}`
      );
      setUser(newUser.data);
      await socket.emit("login", newUser.data, () => {});
    };

    const all_Users = async () => {
      const users = await instance.get("/user/alluser");
      setAllUsers([...users.data]);

      const allusers = await instance.get("/user/allactiveuser");
      setActiveUsers([...allusers.data]);

      // await getAllMessages(id);

      const all_Chat_Groups = await instance.get("/user/allgroups");
      setAllChatGroups([...all_Chat_Groups.data]);
    };

    getUser();
    all_Users();
    setImage(user.image);
    setName(user.name);

    return () => {
      // socket.disconnect();
    };
  }, []);

  console.log(allUsers);

  // const getAllMessages = async (id) => {
  //   const allMessages = await instance.get(
  //     `/chat/all/${location.pathname.split("/").slice(1)[0]}`
  //   );
  //   setAllMyMessages([...allMessages.data]);
  // };

  useEffect(() => {
    socket.on("someone", async (some1) => {
      const users = await instance.get("/user/alluser");
      const ext = allUsers.find((user) => user._id === some1._id);

      if (!ext) setAllUsers([...users.data]);
    });
  }, []);

  useEffect(() => {
    socket.on("new member", async (member) => {
      const allusers = await instance.get("/user/allactiveuser");
      setActiveUsers([...allusers.data, member]);
    });
  }, [ENDPORTURL]);

  useEffect(() => {
    socket.on("user left", (user) => {
      var result = arrayRemove(activeUsers, user);
      setActiveUsers(result);
    });
  }, []);

  const arrayRemove = (arr, value) => {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  };

  // messages receive
  useEffect(() => {
    socket.on("message", async (message) => {
      const allMessages = await instance.get(
        `/chat/all/${location.pathname.split("/").slice(1)[0]}/${c_user._id}`
      );
      setMessages([...allMessages.data]);
    });
  }, []);

  // Group messages
  useEffect(() => {
    socket.on("group message", async (message) => {
      const myGM = await instance.get(`/chat/groupmessage/${c_user}`);
      setGroupMessages([...myGM.data, message]);
    });
  }, []);

  useEffect(() => {
    socket.on("new group member", async (name) => {
      const all_Chat_Groups = await instance.get("/user/allgroups");
      setAllChatGroups([...all_Chat_Groups.data, ...name]);
    });
  }, []);

  // Detect if online or offline
  useEffect(() => {
    const changeStatus = () => setStatus(navigator.onLine);

    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);

    return () => {
      window.removeEventListener("online", changeStatus);
      window.removeEventListener("offline", changeStatus);
    };
  }, []);

  useEffect(() => {
    if (status) {
      heartBeat();
    } else {
      console.log("offline");
    }
  }, []);

  // Send heartBeat to the chat server
  const heartBeat = () => {
    setInterval(() => {
      console.log("hello");
    }, 5000);
  };

  const handelKeypress = (e) => {
    e.preventDefault();
    // Send search to search API
    setSearch("");
  };

  const currentUser = async (user, group) => {
    setC_user(user);
    // await getAllMessages(id);

    if (group) {
      setGroupName(user);
      const usersInGroup = await instance.get(`/user/ingroup/${user}`);
      setGroupMembers([...usersInGroup.data]);

      const myGM = await instance.get(`/chat/groupmessage/${user}`);
      setGroupMessages([...myGM.data]);
    } else {
      setGroupName("");
      setGroupMembers([]);
      setMessages([]);
      const allMessages = await instance.get(
        `/chat/all/${location.pathname.split("/").slice(1)[0]}/${c_user._id}`
      );
      setMessages([...allMessages.data]);
    }

    console.log(c_user);
  };

  const sendMessage = async (message) => {
    if (groupName) {
      if (message) {
        socket.emit("group chat", { groupName, message, id });
      }
    } else {
      if (message !== "" && c_user !== {}) {
        socket.emit("new chat", { from: id, to: c_user._id, message });
      }
    }
  };

  // GROUPS
  const saveGroupInfo = (groups) => {
    socket.emit("create group", { userId: id, groupName: groups });
  };

  const UserList = () => (
    <div style={{ position: "reletive" }}>
      <SearchUser
        handelKeypress={handelKeypress}
        value={search}
        setSearch={setSearch}
      />
      <FloatingActionButtons
        saveGroupInfo={saveGroupInfo}
        Groups={allChatGroups.filter((item, i, ar) => ar.indexOf(item) === i)}
      />
      {allUsers.concat([...uniqueArray(allChatGroups)]).length > 0
        ? allUsers
            .concat([...uniqueArray(allChatGroups)])
            .map((user, i) =>
              user._id !== id ? (
                <UserBar
                  currentUser={currentUser}
                  active={uniqueArray(activeUsers).includes(user._id)}
                  key={i}
                  user={user}
                />
              ) : null
            )
        : null}
    </div>
  );

  const Chats = () => (
    <div style={{ width: "100%" }}>
      <Chat
        barState={barState}
        currentUser={c_user}
        messages={groupName ? groupMessages : messages}
        groupName={groupName}
        sendMessage={sendMessage}
        id={id}
        image={image}
      />
    </div>
  );

  const UserDetails = () => (
    <div>
      <UserInfo
        toggleRightSideBar={toggleRightSideBar}
        groupMembers={groupMembers}
        groupName={groupName}
        currentUser={c_user}
        id={id}
      />{" "}
    </div>
  );

  const views = [UserList(), Chats(), UserDetails()];

  return barState ? (
    <ThreeViews views={views} />
  ) : (
    <TwoViews views={views.slice(0, 2)} />
  );
}
