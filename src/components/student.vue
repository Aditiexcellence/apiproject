<template>
  <div>
    <b-modal v-model="modalShow">
      <b-form v-on:submit.prevent>
        <b-row>
          <b-col lg="5">Name:</b-col>
          <b-col lg="7">
            <b-form-input type="text" v-model="newElement.name"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">Subjects:</b-col>
        </b-row>
        <b-row>
          <b-col lg="5">Math</b-col>
          <b-col lg="7">
            <b-form-input type="number" min="0" v-model="newElement.math"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">English</b-col>
          <b-col lg="7">
            <b-form-input type="number" min="0" v-model="newElement.english"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">Science</b-col>
          <b-col lg="7">
            <b-form-input type="number" min="0" v-model="newElement.science"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">Physics</b-col>
          <b-col lg="7">
            <b-form-input type="number" min="0" v-model="newElement.physics"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">History</b-col>
          <b-col lg="7">
            <b-form-input type="number" min="0" v-model="newElement.history"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="5">Eco</b-col>
          <b-col lg="7">
            <b-form-input type="number" min="0" v-model="newElement.eco"/>
          </b-col>
        </b-row>
        <center>
          <b-button @click="adddata">ADD</b-button>
        </center>
      </b-form>
    </b-modal>
    <b-container class="d-flex justify-content-around">
      <b-button v-on:click="modalShow=!modalShow">Add Student</b-button>
      <b-button v-on:click="findtopper">Topper</b-button>
      <b-button v-on:click="averagepersubject">Average per Subject</b-button>
      <b-button v-on:click="totalaverage">Average</b-button>
    </b-container>
    <table class="table table-bordered text-centered" v-if="canShowtable">
      <thead>
        <th v-if="canShowname">Name</th>
        <th v-if="canShowaveragepersubject">Math</th>
        <th v-if="canShowaveragepersubject">English</th>
        <th v-if="canShowaveragepersubject">Science</th>
        <th v-if="canShowaveragepersubject">Physics</th>
        <th v-if="canShowaveragepersubject">History</th>
        <th v-if="canShowaveragepersubject">eco</th>
        <th v-if="canShowtopper">Total</th>
        <th v-if="showAverage">Average Score</th>
        <th v-if="canShowbutton">Delete</th>
        <th v-if="canShowbutton">Edit</th>
      </thead>
      <tbody>
        <tr v-for="(newElement,index) in studentable" v-bind:key="index">
          <td v-if="canShowname">{{newElement.name}}</td>
          <td v-if="canShowaveragepersubject">{{newElement.math}}</td>
          <td v-if="canShowaveragepersubject">{{newElement.english}}</td>
          <td v-if="canShowaveragepersubject">{{newElement.science}}</td>
          <td v-if="canShowaveragepersubject">{{newElement.physics}}</td>
          <td v-if="canShowaveragepersubject">{{newElement.history}}</td>
          <td v-if="canShowaveragepersubject">{{newElement.eco}}</td>
          <td v-if="canShowtopper">{{newElement.total}}</td>
          <td v-if="showAverage">{{newElement.average_score}}</td>
          <td v-if="canShowbutton">
            <a href="#" v-on:click="deleteItem(index)">Delete</a>
          </td>
          <td v-if="canShowbutton">
            <a
              href="#"
              v-on:click="editItem(newElement, index)"
              @click="modalShow = !modalShow"
            >Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Student",
  data: function() {
    return {
      modalShow: false,
      studentable: [],
      newElement: {
        name: "",
        math: "",
        english: "",
        science: "",
        physics: "",
        history: "",
        eco: ""
      },
      canShowtable: false,
      canShowtopper: false,
      canShowaveragepersubject: true,
      canShowbutton: true,
      canShowname: true,
      showAverage: false
    };
  },
  methods: {
    adddata: function() {
      this.canShowtable = true;
      let math = Number(this.newElement.math);
      let english = Number(this.newElement.english);
      let science = Number(this.newElement.science);
      let physics = Number(this.newElement.physics);
      let history = Number(this.newElement.history);
      let eco = Number(this.newElement.eco);
      let url = "http://127.0.0.1:5000/exam/add_students";
      let response = this.axios({
        method: "post",
        url: url,
        data: {
          name: this.newElement.name,
          math: math,
          english: english,
          science: science,
          physics: physics,
          history: history,
          eco: eco
        }
      }).then(response => {
        console.log(response.data, "111111111");
      });
      this.axios("http://127.0.0.1:5000/exam/get_all").then(res => {
        // console.log(res.data);
        var somedata = res.data;
        this.studentable = res.data;
        somedata.forEach(element => {
          console.log(element._id,'7788898788787878766666666666666');
          localStorage.setItem("token", JSON.stringify(element._id));
        });
      });
      this.newElement = {
        name: "",
        math: "",
        english: "",
        science: "",
        physics: "",
        history: "",
        eco: ""
      };
      this.modalShow = !this.modalShow;
      console.log(response, "555555555555");
    },
    findtopper: function() {
      this.canShowtopper = true;
      this.canShowtable = true;
      this.canShowaveragepersubject = false;
      this.canShowname = true;
      this.showAverage = false;
      this.canShowbutton = false;
      this.axios("http://127.0.0.1:5000/exam/get_max").then(response => {
        console.log(response.data);
        this.studentable = response;
      });
    },
    averagepersubject: function() {
      this.canShowbutton = false;
      this.canShowtable = true;
      this.canShowname = false;
      this.canShowtopper = false;
      this.canShowaveragepersubject = true;
      this.showAverage = false;
      this.axios("http://127.0.0.1:5000/exam/get_t_avg").then(response => {
        console.log(response, "76876786");
        this.studentable = response.data;
      });
    },
    totalaverage: function() {
      this.canShowname = false;
      this.canShowbutton = false;
      this.canShowtable = true;
      this.canShowtopper = false;
      this.canShowaveragepersubject = false;
      this.showAverage = true;
      this.axios("http://127.0.0.1:5000/exam/get_max").then(response => {}),
        this.axios("http://127.0.0.1:5000/exam/avg").then(res => {
          console.log(res.data, "99909090");
          this.studentable = res.data;
        });
    },
    deleteItem: function() {
      this.canShowname = true;
      this.canShowbutton = true;
      this.canShowtable = true;
      this.canShowtopper = false;
      this.canShowaveragepersubject = true;
      this.showAverage = false;
      console.log(this.token, "4w4w");
      let id = JSON.parse(localStorage.getItem("token"));
      console.log(id, "76687");
      this.axios.delete(`http://127.0.0.1:5000/exam/delete_record/{id}`,{params: {id}}).then(response =>{
        console.log(response);
        this.studentable= response;
      });

      this.axios("http://127.0.0.1:5000/exam/get_all").then(res => {
        console.log(res.data);
        this.studentable = res.data;
      });
    },
    editItem: function() {}
  }
};
</script>

<style>
.table {
  margin-top: 2%;
}
</style>