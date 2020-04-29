<template>
  <div class="row" >
  <div class="col-md-10">
      <div class="card">
        <div class="card-header">
         
        </div>
        <div class="card-body">
          <strong class="card-title">เพิ่มข้อมูล หมวดบทเรียน</strong>
          <hr>
         <form action=""  >
         
         <div class="row form-group">
              <div class="col col-md-2"><label for="question" class=" form-control-label">ชื่อเรื่อง</label></div>
              <div class="col-12 col-md-8"><input type="text" name="question" v-model="newData.name"   class="form-control"></div>
         </div>
          <div class="row form-group">
              <div class="col col-md-2"><label for="answer" class=" form-control-label">รายละเอียด</label></div>
              <div class="col-12 col-md-9">
               
               <ckeditor  v-model="newData.description" ></ckeditor>
              </div>
         </div>

         <div class="row form-group">
              <div class="col col-md-2"><label for="sequence" class=" form-control-label">ลำดับ </label></div>
              <div class="col-12 col-md-3"><input type="text" name="sequence" v-model="newData.sequence"  class="form-control"></div>
         </div>
          
           
          <div class="form-group" align="center">
         
          <button  type="button"  class="btn btn-primary btn" @click="saveData();">
          <i class="fa fa-dot-circle-o"></i>
          Submit</button>

          <button type="reset" class="btn btn-danger btn">
                <i class="fa fa-ban"></i> Reset
          </button>
        
          </div> 

         </form>
        



        </div>
      </div>
    </div>
    </div>


</template>

<script>
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    name: "catAdd",
    data() {
       return {
           newData: {
               name: '', description: '',
               sequence: '', author:'1' ,
               editor: ClassicEditor,
            
               },
        } 
    }, 
     beforeCreate() {
     // console.log(this.$cookies.get('login'))
        if (this.$cookies.get('login')=='false') {
         this.$router.replace("/login")
          
        }
     
  },
    methods:{
        saveData(){
         var dataForm = this.toFormData(this.newData);
			     axios.post('http://sisaket-run.com/php_action/apiData.php?action=insert&p=cat', dataForm)
				.then(response => {
					 console.log(response.data.message);
					
					if(response.data.error){
					 	//app.errorMessage = response.data.message;
                         console.log(response.data.message);
                     
					}
					else{
                       
                   //  this.$route.push('/faq')
					//	app.successMessage = response.data.message
					  this.$router.replace('/lessonCategory')
					}
				});
               // location.replace('/faq')
                  // this.$route.push({name:'faq'})
        },
        toFormData(obj){
			     var form_data = new FormData();
			      for(var key in obj){
			       	form_data.append(key, obj[key]);
			      }
		   return form_data;
		},
       

      }
     
    
}
</script>
