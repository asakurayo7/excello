<template>
  <div class="row" >
  <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <strong class="card-title">จัดการ หมวดบทเรียน</strong>
        </div>
        <div class="card-body">
       
        <p><router-link to="/lessonCategoryAdd"><button type="button"  class="btn btn-success m-b-10 m-l-10 float-right"  >
        <i class="fa fa-plus-square"></i>  เพิ่มข้อมูล
       </button></router-link></p>
      
     
       
          <table class="table table-striped dtTable">
            <thead>
              <tr>
                <th scope="col" style="width: 10%">#</th>
                <th scope="col">ชื่อเรื่อง</th>
               
                <th scope="col">ผู้เขียน</th>
                <th scope="col">ลำดับ</th>
                <th scope="col">สร้างเมื่อ</th>
                <th scope="col">อัพเดท</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="cat in cats" v-bind:key="cat.id" >
                <th scope="row">
              <router-link :to="{ name: 'lessonCategoryEdit', params: { id: cat.id}}">  <a href="#" class="text-success mx-3" ><i class="fa fa-edit"></i></a></router-link>

                <a href="#" class="text-danger" @click="deleteData(cat.id)" ><i class="fa fa-trash"></i></a>
                </th>
                <td>{{cat.name}}</td>
             
                <td>{{cat.username}}</td>
                <td>{{cat.sequence}} </td>
                <td>{{cat.created_at}}</td>
                <td>{{cat.updated_at}}</td>
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
  name: "faq",
  data() {
    return {
    
    cats:[],
    catID:''
    };
  },
   beforeCreate() {
     // console.log(this.$cookies.get('login'))
        if (this.$cookies.get('login')=='false') {
         this.$router.replace("/login")
          
        }
     
  },
  methods: {
      getAllData(){
       axios.get('http://sisaket-run.com/php_action/apiData.php?action=read&p=cat')
      .then(response => {
      // JSON responses are automatically parsed.
      //  console.log(response.data.users);
           

       //  console.log(response.data.faqs) ;
         this.cats = response.data.cats;
         })
      .then(()=>{
       
      

      })
      .catch(e => {
      this.errors.push(e)
        })  
      },
      
     deleteData(id){
		  if(confirm('คุณต้องการลบข้อมูลหรือไม่ ?')){
       //	var dataForm = app.toFormData(this.clickFaq);
		   axios.get('http://sisaket-run.com/php_action/apiData.php?action=del&p=cat&id='+id)
				.then(response => {
					 console.log( response.data.message);

           this.getAllData();
				 
					if(response.data.error){
						 console.log( response.data.message);
					}
				 
				});
        
       }
		},


    } ,

    mounted () {
   //    console.log(this.$cookies.get('user').username)
      //console.log("3test 5555" );  
    this.getAllData();
  }
 
 
};
</script>

</script>