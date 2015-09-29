    // var config = {
    //   host: 'localhost',
    //   isSecure: false,
    //   appname: 'Executive Dashboard'
    // };      
    
    // qsocks.Connect(config).then(function (global) {
    //   global.openDoc('Executive Dashboard').then( function( doc ) {
    //     doc.getObject('PfKsJK').then( function( obj ) {
    //       //console.log(obj);

    //       obj.applyPatches([{
    //       					qPath: '/columns',
    //       					qOp: 'replace',
    //       					qValue: '50'
    //       				},{
    //       					qPath: '/rows',
    //       					qOp: 'replace',
    //       					qValue: '40'
    //       				}]).then( function (res) {
    //       				  doc.doSave();
    //       				});
    //       });
    //   });
    // });
    
$( document ).ready(function() {    
  var qsGlobal;
    
  $( "#qsConnect" ).on( "click", function() {
    var qsServer = $( '#qsServer' ).val();

    console.log( qsServer );
    
    var config = {
      host: 'localhost',
      isSecure: false,
      appname: ''
    };      
    
    qsocks.Connect(config).then(function (global) {    
      qsGlobal = global;
      console.log( 'Connected' );
    });
  });

  $( "#GetAllApps" ).on( "click", function() {

      qsGlobal.getDocList().then( function( docList ) {
        //console.log( docList );
        var apps = '';
        for(var i = 0; i < docList.length; i++ ) {
          var app = docList[i].qDocName;
          apps = apps + app + '<br/>';
        }
        console.log( apps );
        $( '#qsApps' ).html( apps );
        
      });
  });
  
});