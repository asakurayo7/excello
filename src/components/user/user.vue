<template>
  <div class="row" >
  <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <strong class="card-title">จัดการสมาชิก</strong>
        </div>
        <div class="card-body">
       
        <p><router-link to="/userAdd"><button type="button"  class="btn btn-success m-b-10 m-l-10 float-right"  >
        <i class="fa fa-user"></i>  เพิ่มข้อมูล
       </button></router-link></p>
      
     
       
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col" style="width: 10%">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">สิทธิ์</th>
                <th scope="col">ขื่อ - สกุล</th>
                <th scope="col">หน่วยงาน</th>
                <th scope="col">เบอร์โทร</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="user in users" v-bind:key="user.id" >
                <th scope="row">
                <a href="#" class="text-success mx-3" ><i class="fa fa-edit"></i></a>

                <a href="#" class="text-danger" ><i class="fa fa-trash"></i></a>
                </th>
                <td>{{user.username}}</td>
                <td>{{user.email}}</td>
                <td>{{user.role}}</td>
                <td>{{user.firstname}} {{user.lastname}}</td>
                <td>{{user.organization}}</td>
                <td>{{user.phone}}</td>
              </tr>
               
            </tbody>
          </table>



        </div>
      </div>
    </div>
    </div>


</template>




<script>
import axios from 'axios';
export default {
  name: "vueapp",
  data() {
    return {
     errorMsg: false,
     successMsg:false,
     msg: "55555",
    users:[]
    };
  },
  methods: {
      getAllUsers(){
       axios.get('http://localhost/php_action/dataUser.php?action=read&p=u')
    .then(response => {
      // JSON responses are automatically parsed.
       // console.log(response.data.users);
         this.users = response.data.users;
    })
    .catch(e => {
      this.errors.push(e)
    })  
      }
    } ,

    mounted:function() {
    this.getAllUsers();
  }
 
 
};
</script>

</script>