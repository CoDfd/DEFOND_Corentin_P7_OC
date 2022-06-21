<template>

    <header>
        <div class="logo">
        <a title="Groupomania_logo"><img src="../assets/Groupomania_Logos+(3)/icon-left-font-monochrome-black.svg" class="logo__img" alt="Logo Groupomania" title="Groupomnania" /></a>
        </div>  
       
        <nav>
            <div class="nav">
                <a href="#">
                    <div class="nav__button">
                        <p>Login</p>
                    </div>
                </a>
            </div>
            <div class="nav">
                <a href="#">
                    <div class="nav__button">
                        <p>Signup</p>
                    </div>
                </a>
            </div>
        </nav>
    
    </header>

</template>

<script>
export default {
  name: 'HeaderAccueil'
}
</script>


<style scoped lang="scss">
header
{
    width: 100%;
    height : 100px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    position:relative;

    box-shadow: 0px 5px 5px rgba(0,0,0,0.16) ;

    & .logo
    {   
        margin : 0;
        border : solid blue 2px;
        width: auto;
        height: auto;
        padding: 20px 0px 0px 0px;
    
        display: flex;
        justify-content: center;
        text-align: center;

        &__img{
            height: auto;
            width: auto;
            margin: auto;
            display: inline-block;
        }

        & img
        {

            width: 80%;
            height : 80%;
            object-fit: contain;
        }
    }

    & nav {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        margin : 0;

        & .nav {
            text-align: center;
            min-width: 150px;

            &__button {
                width: 100%;
                height: 100%;
                border-top: 3px solid white;

                & p {
                    margin-top: 25%;
                }

                &:hover
                {
                    color : #0065fc;
                    border-top: 3px solid #0065fc;
                }
            }

            & a
            {
                text-decoration: none;
                color: black;
            }
        }
    }
}
@media (min-width: 768px)
{
    header .logo img
    {
        width: 70%;
        height : 70%;
    }
}
</style>