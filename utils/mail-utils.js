var nodemailer=require('nodemailer');

module.exports={
    sendMail: (receiver,subject,msg,msgType='text') =>{
    var transporter=nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'atozonlinemart5@gmail.com',
            pass:'Deepakag123'
        }
    });

    if(msgType==='html'){
        var mailOptions={
            from:'atozonlinemart5@gmail.com',
            to:receiver,
            subject:subject,
            html:msg
        }
    }
    else{
        var mailOptions={
            from:'atozonlinemart5@gmail.com',
            to:receiver,
            subject:subject,
            text:msg
        }

    }

    transporter.sendMail(mailOptions,function(err,info){
        if(err)
            console.log(err)
        else
            console.log(info)
    });
  }
}