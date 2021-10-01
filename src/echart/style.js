const styles = {
    closeBox:{
        position:'absolute',
        bottom:'50px',
        right:'100',
        display:'none'
    },
    openBox:{
        position:'fixed',
        top:'200px',
        right:'100px',
        display:'block',
        width:'200px',
        height:'200px',
        backgroundColor:'#eee',
        textAlign:'center',
        zIndex:1000000
    },
    closeInner:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'20px',
    }
}



module.exports = {
    styles
}