<template>
  <div class="setheight">
    <div class="wrapper">
      <nav id="sidebar" :class="{'active': canShowmenu}">
        <ul class="list-unstyled components">
          <li>
            <a href="#" v-on:click="showstudent">All Student</a>
          </li>
          <li>
            <a href="#" v-on:click="modalShow=!modalShow">Add Student</a>
          </li>
          <li>
            <a href="#" v-on:click="findtopper">Topper</a>
          </li>
          <li>
            <a href="#" v-on:click="averagepersubject">Average per Subject</a>
          </li>
          <li>
            <a href="#" v-on:click="totalaverage">Average</a>
          </li>
        </ul>
      </nav>
      <div id="content">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button
              type="button"
              id="sidebarCollapse"
              class="btn btn-info"
              v-on:click="displaymenu"
            >&#9776;</button>
          </div>
        </nav>
        <table class="table table-bordered text-centered" v-if="canShowtable">
          <thead class="thead-dark">
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
            <tr v-for="(newElement,index) in  paginationStudentable" v-bind:key="index">
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
        <center>
          <button @click="prevPage" v-if="canShowprevious">Previous</button>
          <button @click="nextPage" v-if="canShownext">Next</button>
        </center>
      </div>
    </div>
    <b-modal v-model="modalShow" hide-footer hide-header>
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
      pageSize: 6,
      currentPage: 1,
      canShowtable: true,
      canShowtopper: false,
      canShowaveragepersubject: true,
      canShowbutton: true,
      canShowname: true,
      showAverage: false,
      canShowrollno: true,
      canShowupdate: false,
      canShowadd: true,
      canShowmenu: true,
      canShowprevious: false,
      canShownext: false
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    showstudent: function() {
      this.canShowtable = true;
      this.canShowtopper = false;
      this.canShowaveragepersubject = true;
      this.canShowname = true;
      this.canShowrollno = true;
      this.canShowbutton = true;
      this.showAverage = false;
      this.getdata();
    },
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
      this.canShowprevious = false;
      this.canShownext = false;
      this.canShowtable = true;
      this.canShowaveragepersubject = false;
      this.canShowname = true;
      this.showAverage = false;
      this.canShowbutton = false;
      this.canShowrollno = false;
      this.studentable = [];
      this.axios("http://127.0.0.1:5000/exam/get_max").then(response => {
        this.studentable.push(response.data);
      });
    },
    averagepersubject: function() {
      this.canShowprevious = false;
      this.canShownext = false;
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
      this.canShowprevious = false;
      this.canShownext = false;
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
        somedata = somedata.reverse();
        this.studentable = somedata;
        localStorage.setItem("array", JSON.stringify(somedata));
      });
    },
    displaymenu: function() {
      this.canShowmenu = !this.canShowmenu;
    },
    nextPage: function() {
      console.log(this.studentable.length);
      if (this.currentPage * this.pageSize < this.studentable.length)
        this.currentPage++;
      this.canShowprevious = true;
    },
    prevPage: function() {
      if (this.currentPage > 1) this.currentPage--;
    }
  },
  computed: {
    paginationStudentable: function() {
      /* eslint-disable */
      return this.studentable.filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
        if (index > 4) {
          this.canShownext = true;
        }
      });
    }
  }
};
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
}
.wrapper {
  display: flex;
  width: 100%;
  align-items: stretch;
  height: 100%;
}
.setheight {
  height: 100%;
}
#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #595959;
  padding-top: 4%;
}
#sidebar.active {
  margin-left: -250px;
}
li a {
  padding: 10px;
  color: #ffffff;
  display: block;
  text-decoration: none;
}
li a:hover {
  color: #000000;
  background: #fff;
  text-decoration: none;
}
#content {
  width: 100%;
}
</style>