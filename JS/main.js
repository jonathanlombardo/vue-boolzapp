const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      userName: "Jonathan Lombardo",

      contacts: [
        {
          name: "Vincenzo the machine",
          avatar: "./img/avatar_1.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "El Puccio",
          avatar: "./img/avatar_2.png",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Sere",
          avatar: "./img/avatar_3.png",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Nick the bomber",
          avatar: "./img/avatar_4.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Cappa",
          avatar: "./img/avatar_5.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Big Tia",
          avatar: "./img/avatar_6.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Gigione Micco",
          avatar: "./img/avatar_7.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Er Tizzi",
          avatar: "./img/avatar_8.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],

      searchText: "",
      activeContactIndex: 0,
      orderIndex: 0,
      updateScroll: false,
      updateThreadScroll: false,
      noChats: false,
      addressBook: false,
    };
  },

  // ...

  computed: {
    activeContact() {
      return this.getContactFromIndex(this.activeContactIndex);
    },
  },

  methods: {
    contactAddressClickHandler(contact, index) {
      contact.onChat = true;
      this.contactClickHandler(index);
      this.addressBook = false;
    },

    toggleAddressBook() {
      this.addressBook = !this.addressBook;
    },

    contactClickHandler(index) {
      this.activeContactIndex = index;
      this.updateScroll = true;
    },

    getTime(message) {
      if (!this.getDate(message)) return;
      return `${this.getDate(message).hour}:${this.getDate(message).minute}`;
    },

    getDay(message) {
      if (!this.getDate(message)) return;
      return `${this.getDate(message).day}/${this.getDate(message).month}`;
    },

    getDayTime(message, access = false) {
      if (!this.getDate(message)) return;
      if (access) return `il ${this.getDay(message)} alle ${this.getTime(message)}`;
      return `${this.getDay(message)} ${this.getTime(message)}`;
    },

    getDate(message) {
      if (!message.date) return;
      const date = message.date.split(" ")[0];
      const time = message.date.split(" ")[1];

      const day = date.split("/")[0];
      const month = date.split("/")[1];
      const year = date.split("/")[2];

      const hour = time.split(":")[0];
      const minute = time.split(":")[1];
      const second = time.split(":")[2];

      return {
        day,
        month,
        year,
        hour,
        minute,
        second,
      };
    },

    getNow() {
      const now = new Date();
      const year = `${now.getFullYear()}`;
      const month = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
      const day = now.getDay() < 10 ? "0" + now.getDay() : now.getDay();
      const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
      const minute = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
      const second = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

      return {
        day,
        month,
        year,
        hour,
        minute,
        second,
      };
    },

    getNowString() {
      let text = this.getNow().day;
      text += `/${this.getNow().month}`;
      text += `/${this.getNow().year}`;
      text += ` ${this.getNow().hour}`;
      text += `:${this.getNow().minute}`;
      text += `:${this.getNow().second}`;

      return text;
    },

    isSentToday(message) {
      if (!this.getDate(message)) return;
      return this.getNow().year == this.getDate(message).year && this.getNow().month == this.getDate(message).month && this.getNow().day == this.getDate(message).day;
    },

    srcToJpg(src) {
      const length = src.length - 3;
      src = src.substring(0, length);
      src += "jpg";
      return src;
    },

    getLastMessageText(contact) {
      if (!contact.messages.length) return "";
      return contact.messages[contact.messages.length - 1].message;
    },

    getLastMessage(contact) {
      if (!contact.messages.length) return "";
      return contact.messages[contact.messages.length - 1];
    },

    getLastMessageReceived(contact) {
      if (!contact.messages.length) return "";

      const receivedMessages = contact.messages.filter((message) => message.status == "received");

      if (!receivedMessages.length) return "";
      return receivedMessages[receivedMessages.length - 1];
    },

    getContactFromIndex(index) {
      return this.contacts[index];
    },

    setContactVisibility() {
      for (let contact of this.contacts) {
        contact.visible = contact.name.toLowerCase().includes(this.searchText.toLowerCase().trim());
      }
    },

    sendMessage() {
      if (this.activeContact.draft.trim() == "") return;

      const contact = this.activeContact;

      const message = {
        date: this.getNowString(),
        message: contact.draft,
        status: "sent",
      };

      contact.messages.push(message);
      contact.draft = "";
      contact.order = this.orderIndex + 1;
      this.orderIndex++;
      this.updateThreadScroll = true;
      this.updateScroll = true;

      setTimeout(() => {
        let text;

        switch (getRandomNumber(6)) {
          case 1:
            text = "Sono un bot, non posso rispondere";
            break;
          case 2:
            text = "Come scusa?";
            break;
          case 3:
            text = "Mi sa che hai sbagliato chat!";
            break;
          case 4:
            text = "uummm... interessante";
            break;
          case 5:
            text = "Vai a disturbare qualcun altro";
            break;
          case 6:
            text = "Non ho capito, puoi ripetere?";
            break;
        }

        const answer = {
          date: this.getNowString(),
          message: text,
          status: "received",
        };

        contact.messages.push(answer);
        contact.order = this.orderIndex + 1;
        this.orderIndex++;
        if (contact == this.activeContact) this.updateScroll = true;
      }, 1000);
    },

    deleteMessage(contact, msgIndex) {
      contact.messages.splice(msgIndex, 1);
    },

    copyMessage(message) {
      const text = message.message;
      navigator.clipboard.writeText(text);
    },

    scrollThreads() {
      const threadsWrapper = document.querySelector("#threads-wrapper");
      threadsWrapper.scrollTop = threadsWrapper.scrollHeight * -1;
    },

    scrollMessages() {
      const msgWrapper = document.querySelector("#thread-messages");
      msgWrapper.scrollTop = msgWrapper.scrollHeight;
    },

    writingBarInputHandler() {
      const textareaEl = document.querySelector("#writing-wrapper textarea");
      const maxRows = 4;
      textareaEl.style.height = "auto";

      textareaEl.style.height = Math.min(textareaEl.scrollHeight, parseInt(getComputedStyle(textareaEl).lineHeight) * maxRows) + "px";
    },

    rightClickOnContact(event, contact, index) {
      event.preventDefault();

      let contextmenuEl = document.querySelector(".contextmenu");

      if (contextmenuEl) contextmenuEl.remove();

      contextmenuEl = document.createElement("ul");
      contextmenuEl.classList.add("contextmenu");
      contextmenuEl.style.top = event.pageY + "px";
      contextmenuEl.style.left = event.pageX + "px";

      const deleteEl = document.createElement("il");
      deleteEl.innerText = `Cencella chat di ${contact.name}`;

      contextmenuEl.append(deleteEl);
      document.querySelector("body").append(contextmenuEl);

      deleteEl.addEventListener("click", () => {
        contextmenuEl.remove();

        if (contact == this.activeContact) {
          let mappedContacts = this.contacts.map((contact, i) => {
            return [i, contact.order, contact.onChat];
          });

          mappedContacts = mappedContacts.filter((contact) => {
            return contact[2];
          });

          mappedContacts.sort(function (a, b) {
            return b[1] - a[1];
          });

          let resultIndex;
          mappedContacts.forEach((originContact, index) => {
            if (mappedContacts[1] && index == 0 && originContact[1] == contact.order) resultIndex = mappedContacts[1][0];
            if (originContact[1] <= contact.order) return;
            resultIndex = originContact[0];
          });
        }

        contact.onChat = false;
        if (resultIndex) {
          this.contactClickHandler(resultIndex);
        }
        // else {
        //   this.noChats = true;
        // }

        // -----------
      });

      window.addEventListener("click", function clickOutside(event) {
        if (event.target.parentElement != contextmenuEl) contextmenuEl.remove();
        window.removeEventListener("click", clickOutside);
        console.log("test");
      });
    },
  },

  // ...

  beforeMount() {},

  updated() {
    if (this.updateScroll) {
      this.scrollMessages();
      this.updateScroll = false;
    }

    if (this.updateThreadScroll) {
      this.scrollThreads();
      this.updateThreadScroll = false;
    }

    this.writingBarInputHandler();

    // document.querySelector(".contextmenu").remove;

    // console.log("updated");
  },

  mounted() {
    // scroll thread messages wrapper

    this.scrollMessages();
    this.scrollThreads();

    // init contacts

    this.contacts.forEach((contact) => {
      contact.draft = "";
      if (contact.messages) contact.onChat = true;
    });

    // set threads order

    const orders = this.contacts.map((contact, index) => {
      const lastMsg = this.getLastMessage(contact);
      let order;
      if (lastMsg) {
        const msgDate = this.getDate(lastMsg);
        order = msgDate.year + msgDate.month + msgDate.day + msgDate.hour + msgDate.minute + msgDate.second;
        order = parseInt(order);
      }

      return [index, order];
    });

    orders.sort(function (a, b) {
      return a[1] - b[1];
    });

    const finalOrder = orders.map((order, index) => {
      order[1] = index;
      return order;
    });

    this.activeContactIndex = finalOrder[finalOrder.length - 1][0];
    this.orderIndex = finalOrder[finalOrder.length - 1][1];

    finalOrder.forEach((order) => {
      const contacts = this.contacts;

      contacts[order[0]].order = order[1];
    });
  },
});

app.mount("#app");
