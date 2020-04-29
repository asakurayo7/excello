<template>
  <div class="row" >
  <div class="col-md-10">
      <div class="card">
        <div class="card-header">
         
        </div>
        <div class="card-body">
          <strong class="card-title">แก้ไขข้อมูลผู้ใช้งาน</strong>
          <hr>
         <form action="" class="form-horizontal">
         
         <div class="row form-group">
              <div class="col col-md-2"><label for="email" class=" form-control-label">Email</label></div>
              <div class="col-12 col-md-5"><input type="email"   name="email" v-model="newData.email"  class="form-control"></div>
            </div>
          <div class="row form-group">
              <div class="col col-md-2"><label for="username" class=" form-control-label">Username</label></div>
              <div class="col-12 col-md-5"><input type="text"  disabled name="username"  v-model="newData.username"  class="form-control"></div>
            </div> 

             <div class="row form-group">
              <div class="col col-md-2"><label for="password" class=" form-control-label">Password</label></div>
              <div class="col-12 col-md-5"><input type="password" id="password" name="password" v-model="newData.password"   class="form-control"> </div>
            </div>  
             <div class="row form-group">
              <div class="col col-md-2"><label for="profile_image" class=" form-control-label">รูปประจำตัว</label></div>
              <div class="col-12 col-md-5"><input type="file"  @change="onFileSelect"      class="form-control"> 
               <br>
                
               <div v-if="picShow">
               <img :src="newData.profile_image" width="250" height="300">
                </div>
              </div>
            </div> 

            
         <div class="row form-group">
              <div class="col col-md-2"><label for="sequence" class=" form-control-label">ระดับผู้ใช้งาน </label></div>
              <div class="col-12 col-md-3">
               <select name="role" id="role" v-model="newData.role"  class="form-control">
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
               
                </select>
              
              </div>
         </div>

         <div class="row form-group">
              <div class="col col-md-2"><label for="firstname" class=" form-control-label">ชื่อ</label></div>
              <div class="col-12 col-md-5"><input type="text" id="firstname" name="firstname"  v-model="newData.firstname"  class="form-control"></div>
            </div> 

            <div class="row form-group">
              <div class="col col-md-2"><label for="lastname" class=" form-control-label">นามสกุล</label></div>
              <div class="col-12 col-md-5"><input type="text" id="lastname" name="lastname"  v-model="newData.lastname"  class="form-control"></div>
            </div> 

            <div class="row form-group">
              <div class="col col-md-2"><label for="position" class=" form-control-label">ตำแหน่ง</label></div>
              <div class="col-12 col-md-5"><input type="text" id="position" name="position" v-model="newData.position" class="form-control"></div>
            </div> 

            
               <div class="row form-group">
              <div class="col col-md-2"><label for="organization" class=" form-control-label">หน่วยงาน</label></div>
              <div class="col-12 col-md-5"><input type="text" id="organization" name="organization"  v-model="newData.organization"  class="form-control"></div>
            </div>

              <div class="row form-group">
              <div class="col col-md-2"><label for="phone" class=" form-control-label">เบอร์โทรศัพท์</label></div>
              <div class="col-12 col-md-5"><input type="text" id="phone" name="phone"  v-model="newData.phone"  class="form-control"></div>
            </div>
          
           
          <div class="form-group" align="center">
         
          <button  type="button"  class="btn btn-primary btn" @click="onSave();">
          <i class="fa fa-dot-circle-o"></i>
          Save</button>

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


export default {
  name: "userEdit",
   data(){
      return{
            newData: {
               email: '', username: '',
               	password: '', 	role:'' ,
               status:'available' , firstname:'',
               	lastname:'' , position:'',
                	organization:'' , phone:'',profile_image:'',
                  
               },
               picShow:false,
           
           pic:null

      }
   },
    beforeCreate() {
     // console.log(this.$cookies.get('login'))
        if (this.$cookies.get('login')=='false') {
          this.$router.replace("/login")
          
        }
     
  },
methods:{
     onFileSelect(event){
     this.pic = event.target.files[0];
    // alert(event);
    //console.log(this.pic);
      
     },
      getData(){
         var id =   this.$route.params.id;
        axios.get('http://sisaket-run.com/php_action/dataUser.php?action=get&p=u&id='+id)
				.then(response => {
					// console.log( response.data.faqs);
				   
         //   console.log( aa);
         //console.log(response.data.faqs );
					if(response.data.error){
						  
					}
					else{
				 this.newData=response.data.users  ;
         this.newData.password='';
         if(this.newData.profile_image !=''){
             this.picShow =true;
            this.newData.profile_image ="http://sisaket-run.com/php_action/"+this.newData.profile_image ;
         }

					}
				});
   
         }, 

     onSave(){

       var dataForm = this.toFormData(this.newData);
        var id =   this.$route.params.id;
      // console.log(this.pic);
		    axios.post('http://sisaket-run.com/php_action/dataUser.php?action=update&p=u&id='+id, dataForm,
         {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
           )
				.then(response => {
					 console.log(response.data.message);
					
					if(response.data.error){
					 	//app.errorMessage = response.data.message;
                         console.log(response.data.message);
                     
					}
					else{
                       
                   //  this.$route.push('/faq')
					//	app.successMessage = response.data.message
					  this.$router.replace('/user')
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
            form_data.append('userpic', this.pic);
		   return form_data;
		},

   }  , mounted() {
   
           this.getData();
          }
}
</script>