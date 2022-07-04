<template>

    <header>
        <div class="logo">
        <a title="Groupomania_logo"><img src="../assets/Groupomania_Logos+(3)/icon-left-font-monochrome-white.svg" class="logo__img" alt="Logo Groupomania" title="Groupomnania" /></a>
        </div>  
       
        <nav>
            <div class="nav">
                <router-link to="/login">
                    <div v-if="lsref === 'login'" class="nav__buttonselected">
                        <p>Login</p>
                    </div>
                    <div v-else class="nav__button">
                        <p>Login</p>
                    </div>
                </router-link>
            </div>
            <div class="nav">
                <router-link to="/signup">
                    <div v-if="lsref === 'signup'" class="nav__buttonselected">
                        <p>Signup</p>
                    </div>
                    <div v-else class="nav__button">
                        <p>Signup</p>
                    </div>
                </router-link>
            </div>
        </nav>
    
    </header>

</template>

<script>
export default {
  name: 'HeaderAccueil',
  props: {
        lsref: String
    }
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

    background-color: #0968EC;
    box-shadow: 0px 5px 5px rgba(0,0,0,0.16) ;

    & .logo
    {   
        margin : 0;
        width: auto;
        height: auto;
        padding: 20px 0px 0px 0px;

        &__img{
            
            height: auto;
            width: auto;
            margin: auto;
            display: inline-block;
        }

        & img
        {
           
            width: 70%;
            height : 70%;
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

@media (min-width: 768px){
.logo {
    display: flex;
    justify-content: center;
    text-align: center;
}
}

@media (max-width: 767px)
{
header {
    width : 100%;
    height : 100px;

    &  .logo {
        flex-direction :row-reverse;
        &__img{
            margin : 0;
        }
        & img
        {
            width: 60%;
            height : 60%;
        }

    }

    & nav {
        width : auto;
        padding : 0;
        & .nav {
            width : auto;
            min-width: 50px;

                display : flex;
                align-items: flex-end;

            &__button {
                width : auto;
                display : flex;
                align-items: flex-end;
                & p {
                    margin : 0;
                    width : auto;
                    padding : 20px;
                }
            }

            &__buttonselected {
                width : auto;
                display : flex;
                align-items: flex-end;
                & p {
                    margin : 0;
                    width : auto;
                    padding : 20px;
                }
            }
        }
    }
}
}

/*@media (max-width: 768px)
{
    header {
        &__logo {
            visibility : hidden;
        }
    }
    header .logo img
    {
        display : hidden;
    }
}*/
</style>