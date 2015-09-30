

$(document).ready(function(){
    var qsGlobal;
    var qsDoc;
    var config = {};
    $( "#qsConnect" ).on( "click", function() {
  
      // var key =  $.ajax({
      //                     url: "http://127.0.0.1:3320/GritChange/cert/client_key.pem",
      //                     async: false
      //                 }).responseText;
                       
      // var client =  $.ajax({
      //                     url: "http://127.0.0.1:3320/GritChange/cert/client.pem",
      //                     async: false
      //                 }).responseText;                 
                       
        // var config = {
        //   host: 'kn2-qvl-p0007.systems.private',
        //   isSecure: true,
        //   key: key, 
        //   cert: client,
        //   rejectUnauthorized: false
        //   //, appId: '978970f6-e91e-477d-9094-52d55a7792aa'
        // };  
        
        
        var config = {
          host: 'localhost',
          isSecure: false,
          appname: ''
        };          
  
  
  
       qsocks.Connect(config).then(function(global) {
          if( global ) {
            console.log( 'connected!' );
          }
        
          qsGlobal = global;
        });
    });
    
    $( "#GetAllApps" ).on( "click", function() {  
      qsGlobal.getDocList().then( function( docList ) {
         $( '#qsApps' ).empty();

            $('#qsApps').append($("<option/>", {
                value: 'empty',
                text: ''
            })); 

        
        for( var i = 0; i < docList.length; i++) {

            $('#qsApps').append($("<option/>", {
                value: docList[i].qDocId,
                text: docList[i].qTitle
            }));          
        }
      });
    });
    
    
    $( "#GetAllSheets" ).on( "click", function() {   
      selectedAppId = $( "#qsApps option:selected" ).val();
      qsGlobal.openDoc( selectedAppId ).then( function( doc ) {
        qsDoc = doc;
        doc.getAllInfos().then( function( objs ) {
          sheets = objs.qInfos.filter(function(d) { return d.qType == 'sheet'; });
          
          $('#SheetsTable tbody').empty();
          
          for( var i = 0; i < sheets.length; i++) {
            doc.getObject( sheets[i].qId ).then( function( sheet ) {
              sheet.getProperties().then( function( props ) {
                //console.log( props.qMetaDef.title );
                console.log( props );
                //console.log( '<tr> <td> ' + props.qMetaDef.title +  ' </td> <td> <input type="text" value="' + props.columns  +  '">  </td> <td> <input type="text" value="' + props.rows  + '">  </td> </tr>' )
                $("#SheetsTable > tbody").append( '<tr> <td style="display:none;"> <span class="sheetId">'+ props.qInfo.qId+'</span>  </td> <td>' + props.qMetaDef.title +  '</td> <td><input class="column" type="text" value="' + props.columns  +  '"></input></td> <td><input class="row" type="text" value="' + props.rows  + '"></td> </tr>');
    

                
              });
            });
          }
          
        });
      });
    });
    
    
    
$( "#SaveSheets" ).on( "click", function() {
  ids = [];
  $(".sheetId").each(function() {
      ids.push( ($(this).text()) );
  });
  
  //console.log( ids );  
    
  cols = [];
  $(".column").each(function() {
      cols.push( ($(this).val()) );
  });
  
  //console.log( cols );
  
  rows = [];
  $(".row").each(function() {
      rows.push( ($(this).val()) );
  });
  
  //console.log( rows );
  var o = [];
  for(var i = 0; i < ids.length; i++ ) {
    var a1 = {};
    var p = [];
    var c = {};
    var r = {};
    
    a1.id = ids[i];
    
    c.qPath = "/columns";
    c.qOp = 'replace';
    c.qValue = cols[i];
    p.push(c);
    
    r.qPath = "/rows";
    r.qOp = 'replace';
    r.qValue = rows[i];  
    p.push(r);    
    
    a1.data = p;
    o.push(a1);
    
  }
  
  console.log(o);
  
    var promise = Promise.resolve(3);
    Promise.all(o.map(function(d) {
      console.log(d.data);
      return qsDoc.getObject( d.id ).then( function( obj ) {
              obj.applyPatches( d.data ).then( function (res) {
            	  console.log( res );
            	});    
             });
    })).then( function() {
            				  qsDoc.doSave().then( function() {
      				   console.log( 'saved' );
      				  });                        
    });
    
    

    
  //   console.log(  ids[i]);
  //   console.log( p);
    



 

                  
      //           });
});
    
    
    
    
});


// var key =  $.ajax({
//                     url: "http://127.0.0.1:51792/GridChange/cert/client_key.pem",
//                     async: false
//                 }).responseText;
                 
// var client =  $.ajax({
//                     url: "http://127.0.0.1:51792/GridChange/cert//client.pem",
//                     async: false
//                 }).responseText;                 
                 
//   var config = {
//     host: 'kn2-qvl-p0007.systems.private',
//     isSecure: true,
//     key: key, 
//     cert: client,
//     rejectUnauthorized: false
//     //, appId: '978970f6-e91e-477d-9094-52d55a7792aa'
//   };
  
  
//   qsocks.Connect(config).then(function(global) {
    
//     // global.getDocList().then( function( docList ) {
//     //   console.log( docList );
//     // })
    
//     global.openDoc('978970f6-e91e-477d-9094-52d55a7792aa').then( function( doc ) {
//       console.log( doc )
      
//       // //doc.getAllInfos().then( function( objs ) {
//       // doc.getAllInfos().then( function( objs ) {
//       //   console.log( objs )
//       //   //console.log( objs.qScript )
//       // })
      
//     doc.getObject('UJrWy').then( function( obj ) {
//       console.log(obj);

//       obj.applyPatches([{
//       					qPath: '/columns',
//       					qOp: 'replace',
//       					qValue: '10'
//       				},{
//       					qPath: '/rows',
//       					qOp: 'replace',
//       					qValue: '10'
//       				}]).then( function (res) {
//       				  console.log( res )
//       				  doc.doSave().then( function() {
//       				   console.log( 'saved' ) 
//       				  });
//       				});
//       });
//     });
//   });
