<script setup></script>

<template>
  <main>
    <button>theopenbrain.org</button>
    <br />
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />
    <label for="mail">Mail:</label>
    <input type="email" id="mail" name="mail" />
    <button @click="setData()">submit</button>
  </main>
</template>

<script>
import DataService from "../services/DataService";
import { getDatabase, ref, set, onValue } from "firebase/database";

export default {
  data() {
    return {
      data: null,
      database: null,
    };
  },
  mounted() {
    this.getData();
  },
  // watch: {
  //   data(newData, OldData) {
  //     console.log("watcher", newData, OldData);
  //   },
  // },
  methods: {
    setData() {
      console.log(this.data);
      var name = document.getElementById("name").value;
      var mail = document.getElementById("mail").value;
      this.writeUserData(name, mail);
    },
    writeUserData(name, email) {
      const db = getDatabase();
      set(ref(db, "users/" + name), {
        username: name,
        email: email,
      });
    },
    getData() {
      const db = getDatabase();
      const starCountRef = ref(db);
      onValue(starCountRef, (snapshot) => {
        var data = snapshot.val();
        this.data = data;
      });
    },
  },
};
</script>

<style scoped></style>
