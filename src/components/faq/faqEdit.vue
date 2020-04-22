<template>
  <div class="row" >
  <div class="col-md-10">
      <div class="card">
        <div class="card-header">
         
        </div>
        <div class="card-body">
          <strong class="card-title">เพิ่มข้อมูล FAQ</strong>
          <hr>
         <form action=""  >
         
         <div class="row form-group">
              <div class="col col-md-2"><label for="question" class=" form-control-label">คำถาม</label></div>
              <div class="col-12 col-md-5"><input type="text" name="question" v-model="newFaq.question" placeholder="Question" class="form-control"></div>
         </div>
          <div class="row form-group">
              <div class="col col-md-2"><label for="answer" class=" form-control-label">คำตอบ</label></div>
              <div class="col-12 col-md-9"><textarea type="text" name="answer"  v-model="newFaq.answer" rows="20"   class="form-control"></textarea></div>
         </div>

         <div class="row form-group">
              <div class="col col-md-2"><label for="sequence" class=" form-control-label">ลำดับคำถาม</label></div>
              <div class="col-12 col-md-3"><input type="text" name="sequence" v-model="newFaq.sequence"  class="form-control"></div>
         </div>
          
           
          <div class="form-group" align="center">
         
          <button  type="button"  class="btn btn-primary btn" @click="saveFaq();">
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
import VueRouter from 'vue-router';
export default {
    name: "faqAdd",
   data() {
       return {
           newFaq: {
               question: '', answer: '',
               sequence: '', author:'1' 
               },
        } 
      }, methods:{

         getFaq(id){
             	axios.get('http://localhost/php_action/dataUser.php?action=get&p=faq&fid='+id)
				.then(function(response){
					 console.log( response.data.faq);
				 
					if(response.data.error){
						 
					}
					else{
						 
				//	app.getAllFaq();
					}
				});


         }, 
        saveFaq(){
              var dataForm = this.toFormData(this.newFaq);
			     axios.post('http://localhost/php_action/dataUser.php?action=insert&p=faq', dataForm)
				.then(function(response){
					//console.log(response.data.message);
					
					if(response.data.error){
					 	//app.errorMessage = response.data.message;
                         console.log(response.data.message);
                     
					}
					else{
                       
                    // router.push('faq')
					//	app.successMessage = response.data.message
					 
					}
				});
                this.$router.replace('/faq')
                //  this.$route.push('/faq')
        },
        toFormData(obj){
			     var form_data = new FormData();
			      for(var key in obj){
			       	form_data.append(key, obj[key]);
			      }
		   return form_data;
		},
       

      },
      mounted() {
   
    this.getFaq(this.$route.params.fid);
      }
     
    
}
</script>
