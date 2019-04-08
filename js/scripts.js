// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId=0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++){
    if(this.contacts[i]){
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id){
  for (var i =0; i< this.contacts.length; i++){
    if (this.contacts[i]) {
      if(this.contacts[i].id == id){
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

//Business Logic for Contacts
function Contact(firstName) {
  this.firstName = firstName;

}

Contact.prototype.fullName = function() {
  return this.firstName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay){
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};


  $(document).ready(function() {
     attachContactListeners();
    $("form#new-contact").submit(function(event) {
      event.preventDefault();
      var inputtedFirstName = $("input#new-first-name").val();

      $("input#new-first-name").val("");

      var newContact = new Contact(inputtedFirstName);
      addressBook.addContact(newContact);
      displayContactDetails(addressBook);  // <--- this is the new line!
    });
  });

function showContact(contactId){
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='doneButton' id=" + + contact.id + ">Done</button>");
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
      showContact(this.id);
  });

  $("#buttons").on("click" , ".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
  $("#buttons").on("click" , ".doneButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").css('color', 'green');
    displayContactDetails(addressBook);
  });

};
