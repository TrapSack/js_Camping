class Message {
  constructor(message, to) {
    this.id = "_" + Math.random().toString(36).substr(2, 9);
    this.message = message.toString();
    this.createdAt = new Date();
    this.author = "user";
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
      tempFiltered = temp.filter((item) =>
        item.author.includes(filterConfig.author)
      );
    } // includes
    if (filterConfig.dateFrom) {
      tempFiltered = temp.filter(
        (item) =>
          item.createdAt >= filterConfig.dateFrom &&
          item.createdAt <= filterConfig.dateTo
      ); // to 2 filters
    }

    if (filterConfig.dateTo) {
      tempFiltered = temp.filter(
        (item) => item.createdAt <= filterConfig.dateTo
      );
    }

    if (filterConfig.text) {
      tempFiltered = temp.filter((item) =>
        item.text.includes(filterConfig.text)
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

    return true;
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
    console.log(this.messages);
  }
  edit(id, message) {
    let checkOnEditable = false;
    this.messages.forEach((item) => {
      if (item.id === id.toString()) {
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

let msg1 = new Message("Hello", "ivan228");
let msg2 = new Message("safas");
let msg = [msg1, msg2];

let messagelist = new MessageList(msg);
