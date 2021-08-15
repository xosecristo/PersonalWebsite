const personalData = {
    firstName: "Jose Alonso ",
    lastname: "Valle Martinez",
    fullName: function () {
        return this.firstName + this.lastname;
    }
}

document.getElementById("fullName").innerHTML = personalData.fullName();

let contact = {
    email: "xosecristo@outlook.com",
    webpage: "xosecristo.github.io"
}

document.getElementById("email").innerHTML = contact.email;
document.getElementById("webpage").innerHTML = contact.webpage;
