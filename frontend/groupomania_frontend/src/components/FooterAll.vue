<template>
    <footer>
        <div id="footer_container">
            <p>
                © Corentin Defond 
            </p>
        </div>
    </footer>
</template>


<script>
export default {
  name: 'FooterAll'
}
</script>


<style scoped lang="scss">

footer{
    width : 100%;
    height: 80px;
    margin:0;
    padding:0 ;
    position:absolute;
    bottom:0;
    display : flex;
    align-items: center;
    justify-content: center;

    background-color: lightgrey;

    & #footer_container {
        width : 100%;
        height: 100%;
        margin:0;
        padding:0;

        & p{
            margin : 0;
            padding : 10px 0 0 0;;
        }
    }
    
}

@media (max-width: 767px) {
    footer {
        height : 50px;
        & p {
            margin : 0;
        }
    }
}

</style>