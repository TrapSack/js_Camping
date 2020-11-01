let messages = [
  {
    id: "1",
    text: "Привет!",
    createdAt: new Date("2020-10-12T19:20:00"),
    author: "ASDSADSADDSAD",
    isPersonal: true,
    to: "Петров Петр",
  },
  {
    id: "2",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T19:40:00"),
    author: "AABAA",
    isPersonal: false,
  },
  {
    id: "3",
    text: "Привет!",
    createdAt: new Date("2020-10-12T20:20:00"),
    author: "AABAA",
    isPersonal: true,
    to: "Петров Петр",
  },
  {
    id: "4",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T21:30:00"),
    author: "CCCCCC",
    isPersonal: false,
  },

  {
    id: "5",
    text: "Привет!",
    createdAt: new Date("2020-10-12T22:10:00"),
    author: "AABAA",
    isPersonal: true,
    to: "Петров Петр",
  },
  {
    id: "6",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "CASASSAF",
    isPersonal: false,
  },
  {
    id: "7",
    text: "asfsaf?",
    createdAt: new Date("2020-10-12T24:00:00"),
    author: "zxcvbr",
    isPersonal: false,
  },
  {
    id: "8",
    text: "AAAAAAAAACC?",
    createdAt: new Date("2020-10-12T00:00:00"),
    author: "gass",
    isPersonal: false,
  },
  {
    id: "9",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "пфпыпыфпфы",
    isPersonal: false,
  },
  {
    id: "10",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "рддвыр",
    isPersonal: false,
  },
  {
    id: "11",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "саня",
    isPersonal: false,
  },
  {
    id: "11",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "кьл",
    isPersonal: false,
  },
  {
    id: "12",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "CASASSAF",
    isPersonal: false,
  },
  {
    id: "13",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "CASASSAF",
    isPersonal: false,
  },
  {
    id: "14",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "CASAыр",
    isPersonal: false,
  },
  {
    id: "15",
    text: "АФЫАЫФЫФПЫЫ?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "CASASSAF",
    isPersonal: false,
  },
  {
    id: "16",
    text: "asagffdhhfd",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "kgfyf",
    isPersonal: false,
  },
  {
    id: "17",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "Cncxnxncx",
    isPersonal: false,
  },
  {
    id: "18",
    text: "Какие дела?",
    createdAt: new Date("2020-10-12T23:00:00"),
    author: "ggahdds",
    isPersonal: false,
  },
];
let idCount = 6;
let user = "user";
let to = "sasha";
console.log(messages);

// function addMessage(e) {
//   messages.push({
//     id: idCount++,
//     text: document.getElementById("messageddd").value,
//     createdAt: new Date(),
//     author: user,
//     isPersonal: false,
//     to: "none",
//   });
//   console.log(messages);
// }

const msg = (function () {
  filterConfig = {
    author: String,
    dateFrom: Number,
    dateTo: Number,
    text: String,
  };
  let temp = messages;
  function getMessages(skip = +0, top = +10, filterConfig = {}) {
    if (filterConfig.author) {
      temp = temp.filter((item) => item.author == filterConfig.author);
    }
    if (filterConfig.dateFrom && filterConfig.dateTo) {
      temp = temp.filter(
        (item) =>
          item.createdAt >= filterConfig.dateFrom &&
          item.createdAt <= filterConfig.dateTo
      );
    }
    if (filterConfig.text) {
      temp = temp.filter((item) => item.text == filterConfig.text);
    }
    return temp.slice(skip, top);
  }
  function getMessage(id) {
    let tempmsg;
    temp.forEach((item) => {
      if (item.id === id.toString()) tempmsg = item;
    });
    return tempmsg;
  }

  function validateMessage(message) {
    if (
      message.text.toString() === message.text &&
      message.text.toString().length <= 200 &&
      message.id.toString() === message.id &&
      message.author.toString !== ""
    )
      return true;
    else return false;
  }

  function addMessage(message) {
    let newMsg = {
      id: (++idCount).toString(),
      text: message,
      createdAt: new Date(),
      author: user,
      isPersonal: false,
      to: "none",
    };
    if (validateMessage(newMsg)) {
      messages.push(newMsg);
      temp = messages;
      console.log(messages);
      return true;
    }
    return false;
  }

  function editMessage(id, message) {
    let checkOnEditable = false;
    temp.forEach((item) => {
      if (item.id === id.toString()) {
        item.text = message.toString();
        console.log(item);
        checkOnEditable = true;
      }
    });
    return checkOnEditable;
  }

  function removeMessage(id) {
    let isCompleted = false;
    temp.forEach((item, index) => {
      if (item.id === id.toString()) {
        temp.splice(index, 1);
        console.log(temp);
        isCompleted = true;
        messages = temp;
      }
    });
    return isCompleted;
  }

  return {
    getMessages,
    getMessage,
    validateMessage,
    addMessage,
    editMessage,
    removeMessage
  };
})();
