<script setup>
import { useGeneral } from "@/stores";
const store = useGeneral();
</script>

<template>
  <transition
    @before-enter="onBeforeEnter"
    @enter="enter"
    @before-leave="onBeforeLeave"
    @leave="leave"
    name="leftLeave"
    :css="false"
  >
    <div
      v-show="store.activeSidebar"
      class="fixed z-50 right-0 top-0 w-1/3 h-body mt-body p-5 bg-black text-white translate"
    >
      <!-- Inhalt -->
      <div class="flex flex-col">
        <button>theopenbrain.org</button>
        <br />
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label for="mail">Mail:</label>
        <input type="email" id="mail" name="mail" />
        <button @click="setData()">submit</button>
      </div>
    </div>
  </transition>
</template>

<script>
import database from "/src/assets/js/firebase.js";
import { getDatabase, ref, set, onValue } from "firebase/database";
import gsap from "gsap";

export default {
  data() {
    return {
      data: null,
      database: database,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onBeforeEnter(ev) {
      var el = ev;
      var tween = gsap.to(el, {
        duration: 0,
        x: window.innerWidth * 0.35,
        y: 0,
      });
      tween.totalTime(tween.totalDuration());
    },
    onBeforeLeave(ev) {
      var el = ev;
      var tween = gsap.to(el, {
        duration: 0,
        x: 0,
        y: 0,
      });
      tween.totalTime(tween.totalDuration());
    },
    enter(ev, done) {
      var el = ev;
      gsap.to(el, {
        duration: 0.5,
        x: 0,
        y: 0,
        onComplete() {
          done();
        },
      });
    },
    leave(ev, done) {
      var el = ev;
      gsap.to(el, {
        duration: 0.5,
        x: window.innerWidth * 0.35,
        y: 0,
        onComplete() {
          done();
        },
      });
    },

    setData() {
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

<style scoped>
.translate {
  transform: translate(100%, 0px);
}
</style>
