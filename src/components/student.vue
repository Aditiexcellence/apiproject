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
          <b-button @click="adddata" v-if="canShowadd">ADD</b-button>
        </center>
        <center>
          <b-button @click="updatedata(newElement)" v-if="canShowupdate">Update</b-button>
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
        <th v-if="canShowrollno">Roll no</th>
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
          <td v-if="canShowrollno">{{newElement.roll_no}}</td>
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
            <a href="#" v-on:click="deleteItem(newElement,index)">Delete</a>
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
        roll_no: 0,
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
      showAverage: false,
      canShowrollno: true,
      canShowupdate: false,
      canShowadd: true
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    adddata: function() {
      this.canShowtable = true;
      this.canShowtopper = false;
      this.canShowaveragepersubject = true;
      this.canShowname = true;
      this.canShowrollno = true;
      this.canShowbutton = true;
      this.showAverage = false;
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
        this.getdata();
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
    },
    findtopper: function() {
      this.canShowtopper = true;
      this.canShowtable = true;
      this.canShowaveragepersubject = false;
      this.canShowname = true;
      this.showAverage = false;
      this.canShowbutton = false;
      this.canShowrollno = false;
      this.axios("http://127.0.0.1:5000/exam/get_max").then(response => {
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
      this.canShowrollno = false;
      this.axios("http://127.0.0.1:5000/exam/get_t_avg").then(response => {
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
      this.canShowrollno = false;
      this.axios("http://127.0.0.1:5000/exam/get_max").then(response => {}),
        this.axios("http://127.0.0.1:5000/exam/avg").then(res => {
          this.studentable = res.data;
        });
    },
    deleteItem: function(value, index) {
      this.canShowname = true;
      this.canShowbutton = true;
      this.canShowtable = true;
      this.canShowtopper = false;
      this.canShowaveragepersubject = true;
      this.showAverage = false;
      this.canShowrollno = true;
      let id = JSON.parse(localStorage.getItem("array"));
      id.forEach((element, index) => {
        if (element.roll_no === value.roll_no) {
          let token = element._id;
          this.axios
            .delete(`http://127.0.0.1:5000/exam/delete_record/${token.$oid}`)
            .then(response => {
              this.getdata();
            });
        }
      });
    },
    editItem: function(value) {
      this.canShowupdate = true;
      this.canShowadd = false;
      this.canShowname = true;
      this.canShowbutton = true;
      this.canShowtable = true;
      this.canShowtopper = false;
      this.canShowaveragepersubject = true;
      this.showAverage = false;
      this.canShowrollno = true;
      let data = JSON.parse(localStorage.getItem("array"));
      data.forEach((element, index) => {
        if (element.roll_no === value.roll_no) {
          localStorage.setItem("array", JSON.stringify(element._id));
          this.newElement = {
            name: element.name,
            math: element.math,
            english: element.english,
            science: element.science,
            physics: element.physics,
            history: element.history,
            eco: element.eco
          };
        }
      });
    },
    updatedata: function(value) {
      let math = Number(this.newElement.math);
      let english = Number(this.newElement.english);
      let science = Number(this.newElement.science);
      let physics = Number(this.newElement.physics);
      let history = Number(this.newElement.history);
      let eco = Number(this.newElement.eco);
      let token = JSON.parse(localStorage.getItem("array"));
      let url = `http://127.0.0.1:5000/exam/update_record/${token.$oid}`;
      let response = this.axios({
        method: "put",
        url: url,
        data: {
          math: math,
          english: english,
          science: science,
          physics: physics,
          history: history,
          eco: eco
        }
      }).then(response => {
        this.getdata();
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
      });
    },
    getdata: function() {
      this.axios("http://127.0.0.1:5000/exam/get_all").then(res => {
        var somedata = res.data;
        somedata.forEach((element, index) => {
          element["roll_no"] = index + 1;
        });
        this.studentable = somedata;
        localStorage.setItem("array", JSON.stringify(somedata));
      });
    }
  }
};
</script>

<style>
.table {
  margin-top: 2%;
}
</style>