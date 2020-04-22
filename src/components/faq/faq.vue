<template>
  <div class="row" >
  <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <strong class="card-title">จัดการ FAQ</strong>
        </div>
        <div class="card-body">
       
        <p><router-link to="/faqAdd"><button type="button"  class="btn btn-success m-b-10 m-l-10 float-right"  >
        <i class="fa fa-user"></i>  เพิ่มข้อมูล
       </button></router-link></p>
      
     
       
          <table class="table table-striped dtTable">
            <thead>
              <tr>
                <th scope="col" style="width: 10%">#</th>
                <th scope="col">คำถาม</th>
                <th scope="col">คำตอบ</th>
                <th scope="col">ผู้เขียน</th>
                <th scope="col">ลำดับ</th>
                <th scope="col">สร้างเมื่อ</th>
                <th scope="col">อัพเดท</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="faq in faqs" v-bind:key="faq.id" >
                <th scope="row">
              <router-link :to="{ name: 'faqEdit', params: { fid: faq.id}}">  <a href="#" class="text-success mx-3" ><i class="fa fa-edit"></i></a></router-link>

                <a href="#" class="text-danger" @click="deleteFaq(faq.id)" ><i class="fa fa-trash"></i></a>
                </th>
                <td>{{faq.question}}</td>
                <td>{{faq.answer}}</td>
                <td>{{faq.username}}</td>
                <td>{{faq.sequence}} </td>
                <td>{{faq.created_at}}</td>
                <td>{{faq.updated_at}}</td>
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
    
    faqs:[],
    faqID:''
    };
  },
  methods: {
      getAllFaq(){
       axios.get('http://localhost/php_action/dataUser.php?action=read&p=faq')
      .then(response => {
      // JSON responses are automatically parsed.
      //  console.log(response.data.users);
         this.faqs = response.data.faqs;
        
         })
      .then(()=>{
        alert('fetch Success');
        $('.dtTable').DataTable();

      })
      .catch(e => {
      this.errors.push(e)
        })  
      },
     deleteFaq(id){
		  if(confirm('คุณต้องการลบข้อมูลหรือไม่ ?')){
       //	var dataForm = app.toFormData(this.clickFaq);
			axios.get('http://localhost/php_action/dataUser.php?action=del&p=faq&fid='+id)
				.then(function(response){
					 console.log( response.data.message);
				 
					if(response.data.error){
						 
					}
					else{
						 
				//	app.getAllFaq();
					}
				});
        this.getAllFaq();
        //this.$router.go()
       // $router.push('/faq')

       }
		},


    } ,

    mounted () {
    this.getAllFaq();
  }
 
 
};
</script>

</script>