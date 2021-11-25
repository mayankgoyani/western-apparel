
$(document).ready(function () {
    // $('#loginButton').click(function () {
    //     // alert(localStorage.getItem('Authorization').toString());
    //     $.ajax({
    //         url: '/user/xyz',
    //         headers: { "Authorization": localStorage.getItem('Authorization').toString() }
    //     });
    // });


});

localstorageTokenSave = (user) => {
    console.dir(user);
    localStorage.setItem('Authorization', user);
}