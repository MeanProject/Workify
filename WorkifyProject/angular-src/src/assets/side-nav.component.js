
// if (!document.getElementById) document.write('<link rel="stylesheet" type="text/css" href="../app/components/home/home.component.css">');
function hum(){
    console.log("hum clciked");
// $(document).ready(function () {
//     var trigger = $('.hamburger'),
//         overlay = $('.overlay'),
//        isClosed = false;
  
//       trigger.click(function () {
//         hamburger_cross();      
//       });
  
//       function hamburger_cross() {
  
//         if (isClosed == true) {          
//           overlay.hide();
//           trigger.removeClass('is-open');
//           trigger.addClass('is-closed');
//           isClosed = false;
//         } else {   
//           overlay.show();
//           trigger.removeClass('is-closed');
//           trigger.addClass('is-open');
//           isClosed = true;
//         }
//     }
    
//     $('[data-toggle="offcanvas"]').click(function () {
//           $('#wrapper').toggleClass('toggled');
//     });  
// })
};

// function addMemberField(){ 
//     let row = document.createElement('div');   
//       row.className = 'row'; 
//       row.innerHTML = ` 
//       <div class="split ">
//         <label class="form-label" >Name <input type="text" [(ngModel)]="memberName" name="name" data-id="0" id="member-0" class="form-input" value=""></label>
//         <label class="form-label split-email" for="email-0">Email<input type="text" [(ngModel)]="memberEmail" name="email" data-id="0" id="email-0" class="form-input" value=""></label>
//         <span class="delete">REMOVE</span>
//       </div>`; 
//       document.querySelector('.showInputField').appendChild(row); 
//   }


function removeMemberField(event){
  $(".delete").click(function(){
     $(this).parent().remove();
    
  })
}
