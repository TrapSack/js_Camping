let current = "dibil";

class Message {
  currentUser = current;
  constructor(message, to) {
    this.id = "_" + Math.random().toString(36).substr(2, 9);
    this.message = message.toString();
    this.createdAt = new Date();
    this.author = this.currentUser;
    if (to) {
      this.isPersonal = true;
      this.to = to.toString();
    } else {
      this.isPersonal = false;
    }
  }
  get id() {
    return this._id;
  }

  set id(val) {
    if (this._id === undefined) {
      this._id = val.toString();
    } else {
      console.log("cannot set id");
    }
  }
  get author() {
    return this._author;
  }

  set author(val) {
    if (this._author === undefined) {
      this._author = val.toString();
    } else {
      console.log("cannot set author");
    }
  }
  get createdAt() {
    return this._createdAt;
  }

  set createdAt(val) {
    if (this._createdAt === undefined) {
      this._createdAt = val;
    } else {
      console.log("cannot set date");
    }
  }
}

class MessageList {
  constructor(msg) {
    this.messages = msg;
  }

  getPage(skip = +0, top = +10, filterConfig = {}) {
    let tempFiltered = this.messages;
    if (filterConfig.author) {
      tempFiltered = this.messages.filter((item) =>
        item.author.includes(filterConfig.author)
      );
    } // includes
    if (filterConfig.dateFrom) {
      tempFiltered = this.messages.filter(
        (item) =>
          item.createdAt >= filterConfig.dateFrom
      ); // to 2 filters
    }

    if (filterConfig.dateTo) {
      tempFiltered = this.messages.filter(
        (item) => item.createdAt <= filterConfig.dateTo
      );
    }

    if (filterConfig.text) {
      tempFiltered = this.messages.filter((item) =>
        item.message.includes(filterConfig.text)

      );
    } // includes

    // sort after
    tempFiltered.sort((a, b) => {
      Number(a.id) - Number(b.id);
    });
    // return tempFiltered.slice(skip, top);
    let counter = 0;
    let i = skip;
    while (counter < top) {
      if (tempFiltered[i] !== undefined) console.log(tempFiltered[i++]);
      else break;
      counter++;
    }

    return tempFiltered;
  }
  get(id) {
    let tempmsg;
    this.messages.find((item) => {
      if (item.id === id.toString()) tempmsg = item;
    });
    return tempmsg;
  }
  validate(message) {
    if (
      message.text.toString().length <= 200 &&
      message.id.toString() === message.id &&
      message.author.toString() !== "" // wrong also check on string
    )
      return true;
    else return false;
  }
  add(message, to) {
    let newmsg = new Message(message, to);
    this.messages.push(newmsg);
  }
  edit(id, message, to) {
    let checkOnEditable = false;
    this.messages.forEach((item) => {
      if (item.id === id.toString()) {
        if (to) {
          item.isPersonal = true;
          item.to = to.toString();
        }
        item.message = message.toString();
        console.log(item);
        checkOnEditable = true;
      }
    });
    return checkOnEditable;
  }
  remove(id) {
    let isCompleted = false;
    this.messages.forEach((item, index) => {
      if (item.id === id.toString()) {
        this.messages.splice(index, 1);
        console.log(this.messages);
        isCompleted = true;
      }
    });
    return isCompleted;
  }

  clear() {
    this.messages = [];
  }
}

class UserList {
  constructor(users, activeUsers) {
    this.users = users;
    this.activeUsers = activeUsers;
  }
}

class HeaderView {
  constructor(containerId) {
    this.containerId = containerId;
  }
  display(...param) {
    document.querySelector(
      this.containerId
    ).innerHTML = `<div class="chat-header__user-info_user-name">
    ${param}
    <div class="is-online"></div>
    <div class="logout-icon">
            <img src="./images/logout-icon.svg" alt="logout icon" />
          </div>
  </div>`;
  }
}

class MessagesView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(params) {
    document.querySelector(".chat-main__dialog-message-container").innerHTML =
      "";
    params.forEach((item) => {
      let messageContainter = document.createElement("div");
      if (item.isPersonal) {
        messageContainter.className =
          "chat-main__dialog-message-container-element my-message";
        messageContainter.id = item.id.toString();
        messageContainter.innerHTML = `<span class="chat-main__dialog-message-container-text"
      id = "${item.id}">${item.message}</span
    >
    <div
      class="chat-main__dialog-message-container-element__information"
    >
      <span class="chat-main__dialog-message-container-element-name"
        >${item.author}</span
      >
      <span class="chat-main__dialog-message-container-element-date"
        >${item.createdAt}</span
      >
      <span class="chat-main__dialog-message-container-element-to"
      >&nbsp to ${item.to}</span
    >
      <div class="chat-main__dialog-message-container-element-edit">
      <button class="edit-message"></button>
      <button class="delete-message"></button>
    </div>`;
      } else {
        messageContainter.id = item.id.toString();
        messageContainter.className =
          "chat-main__dialog-message-container-element my-message";
        messageContainter.innerHTML = `<span class="chat-main__dialog-message-container-text"
        id = "${item.id}" >${item.message}</span
    >
    <div
      class="chat-main__dialog-message-container-element__information"
    >
      <span class="chat-main__dialog-message-container-element-name"
        >${item.author}</span
      >
      <span class="chat-main__dialog-message-container-element-date"
        >${item.createdAt}</span
      >
      <div class="chat-main__dialog-message-container-element-edit">
      <button class="edit-message"></button>
      <button class="delete-message"></button>
    </div>`;
      }

      document.querySelector(this.containerId).append(messageContainter);
    });
  }
}

class ActiveUsersView {
  constructor(containerId) {
    this.containerId = containerId;
  }

  display(params) {
    params.forEach((item) => {
      let activeUserContainer = document.createElement("div");
      activeUserContainer.className = "chat-main__menu-online-users__element";
      activeUserContainer.innerHTML = `   
        <img
      src="./images/user-icon.svg"
      alt="user icon"
      class="user-icon"
    />
    <span class="user-name">${item}</span>`;
      document.querySelector(this.containerId).append(activeUserContainer);
    });
  }
}

class FilterView {
  constructor(containerId) {
    this.containerId = containerId;
  }
} // idk

class PersonalUsersView {
  constructor(containerId) {
    this.containerId = containerId;
  }
} // try to fix

let users = ["sasha", "vanya", "timur"];

let userList = new UserList(users, users);

let headerview = new HeaderView(".chat-header__user-info");

let messagesview = new MessagesView(".chat-main__dialog-message-container");

let activeUsersView = new ActiveUsersView(".chat-main__menu-online-users");

const msg = [];

let messagelist = new MessageList(msg);

console.log(messagelist);

function setCurrentUser(user) {
  Message.currentUser = current = user.toString();
  headerview.display(user);
}

function addMessage(text, to) {
  if (to) messagelist.add(text, to);
  else messagelist.add(text);

  messagesview.display(messagelist.messages);
}

function editMessage(id, message, to) {
  messagelist.edit(id, message, to);

  messagesview.display(messagelist.messages);
}

function removeMessage(id) {
  messagelist.remove(id);

  messagesview.display(messagelist.messages);
}

function showMessages(skip, top, filterConfig) {
  messagesview.display(messagelist.getPage(skip, top, filterConfig));
}

function showActiveUsers() {
  activeUsersView.display(userList.activeUsers);
}

const dialogInput = document.querySelector(".chat-main__dialog-input");

let deleteEditMessage;
let deleteMessage;
let editMyMessage;

dialogInput.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = document.querySelector(".main-input").value;
  addMessage(value);
  deleteEditMessage = document.querySelectorAll('.my-message')

  deleteMessage.addEventListener('click',()=> {
    alert('asfsaasffa')
  })
  
  console.log(deleteMessage, editMyMessage)
  document.querySelector(".main-input").value = '';
});

const userFilter = document.querySelector(".user-filter");

userFilter.addEventListener("keydown", (e) => {
  let value = document.querySelector(".user-filter-input").value;

  showMessages(0, 10, { author: value });
});



const messageFilter = document.querySelector(".message-filter");

messageFilter.addEventListener("keydown", (e) => {
  let value = document.querySelector(".message-filter-input").value;

  showMessages(0, 10, { text: value });
});



