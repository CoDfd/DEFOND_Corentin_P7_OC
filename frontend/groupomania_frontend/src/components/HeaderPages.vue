<template>

    <header>
        <div class="logo">
            <a title="Groupomania_logo"><img src="../assets/Groupomania_Logos+(3)/icon-left-font-monochrome-white.svg" class="logo__img" alt="Logo Groupomania" title="Groupomnania" /></a>

           <font-awesome-icon  icon="fa-solid fa-house" />
        
        
        </div>  
       
        <nav>
            <div class="nav">
                <router-link to="/">
                    <div class="nav__button">
                        <p>Logout</p>
                    </div>
                </router-link>
            </div>
            <div class="nav">
                <router-link to="/:profil">

                    <div class="nav__button">
                        <p>Profile</p>
                    </div>
                </router-link>
            </div>
        </nav>
    
    </header>

</template>

<script>
export default {
  name: 'HeaderPages'
}
</script>


<style scoped lang="scss">
header
{
    border : solid black 2px;

    width: 100%;
    height : 100px;
    margin: 0;
    display: flex;
    justify-content: space-between;
    position:relative;

    background-color: #0968EC;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.16) ;

    & .logo
    {   
        border : dotted red 1px;

        margin : 0;
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
                border-top: 3px solid #0968EC;

                & p {
                    margin-top: 25%;
                    color : white;
                    font-weight: 800;
                }

                &:hover
                {
                    color : #0968EC;
                    border-top: 3px solid white;
                    & p{
                        font-weight: 900;
                    }
                }
            }

            &__buttonselected {
                width: 100%;
                height: 100%;
                color : #0968EC;
                border-top: 3px solid white;
                & p{
                    margin-top: 25%;
                    color : white;
                    font-weight: 900;
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