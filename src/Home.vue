<script setup>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
import axios from 'axios';
import Cookies from 'js-cookie';
const chat = ref("");
const messages = ref([]);
const socket = io("http://localhost:5000");
  const users = ref([]);

if (Cookies.get('email')) {
const fetchData2 = async () => {
    const response = await axios.get("http://localhost:5000/users2");
    users.value.push(response.data[0].email) 
  }
console.log(users)
fetchData2()
}
  
function handleClick() {
  if (chat.value.trim() !== "") {
    socket.emit("message", chat.value);
    chat.value = ""; // Clear the input after sending
  }
}

onMounted(() => {
  window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  socket.on("receiveMessage", (data) => {
    if (data && data.message) {
      messages.value.push({
        name: "John Doe",
        text: data.message,
        time: new Date().toLocaleTimeString(),
      });
    } else {
      console.error("Received empty or invalid data:", data);
    }
  });
});
</script>

<template>
  <div class="chat-container">
    <!-- Sidebar -->
   
   
    <div class="sidebar">
      <div>
        <div class="header nlogo">Nzxitone</div>
        <h5 class="p-3">Online Users</h5>
        <ul v-for="(user) in users"  class="online-users">
          <li class="text-center">
            <img src="/e.jpg" alt="User">
            <div>
              <div>{{ user }}</div>
              <div style="font-size:12px">Manager</div>
            </div>
          </li>
      
        </ul>
      </div>
      <!-- Tasks Section -->
      <div class="task-section">
        <h6>Tasks</h6>
        <input type="text" id="taskInput" class="form-control" placeholder="Enter task">
        <button id="addTaskButton" class="btn btn-primary btn-sm w-100 mt-2">Add Task</button>
        <ul class="task-list" id="taskList"></ul>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="chat-box">
      <div class="messages" id="messageArea">
        <!-- Messages will appear here -->
        <div v-for="(msg, index) in messages" :key="index" class="message">
          <img src="/e.jpg" alt="User Picture">
          <div class="message-details">
            <div class="name">{{ msg.name }}</div>
            <div class="text">{{ msg.text }}</div>
            <div class="time">{{ msg.time }}</div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="chat-input w-100">
        <div class="input-group m-0">
          <input type="text" class="form-control" v-model="chat" placeholder="Type a message...">
          <button class="btn" id="sendButton" @click="handleClick">Send</button>
        </div>
      </div>
    </div>

    <div class="sidebar2">
      <ul class="online-users2">
        <li class="items items1">Task 2 assigned to abdo</li>
        <li class="items items2">Task 3</li>
        <li class="items items3">Task 4</li>
        <li class="items items4">Task 1</li>
      </ul>
      <!-- Tasks Section -->
      <div class="container2">
        <div class="ball" id="ball"></div>
      </div>
    </div>
  </div>
</template>

