
"use client"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Modal, Spinner } from "flowbite-react";
import { useEffect, useState } from 'react';
import { Vazirmatn } from 'next/font/google';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import { fetchUserId } from '@/lib/reduxStore/userIdSlice';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearUserRole } from '@/lib/reduxStore/userTypeSlice';
import { clearUserToken } from '@/lib/reduxStore/userTokenSlice';
import { clearUserid } from '@/lib/reduxStore/userIdSlice';
import { fetchUserToken } from '@/lib/reduxStore/userTokenSlice';
import { fetchUserRole } from '@/lib/reduxStore/userTypeSlice';

const handleLogout = () => {
  localStorage.removeItem("accessToken"); // مسح التوكن من localStorage
  window.location.href = "/login"; // توجيه المستخدم لصفحة تسجيل الدخول
};




const vazir = Vazirmatn({ subsets: ['arabic'], weight: ['400', '700'] });


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  ); 
}
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal2, setOpenModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setTokenOfTheUser] = useState(null);
  const [idOfTheUser, setIdOfTheUser] = useState(null);
  const [error, setError] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [randomCode, setRandomCode] = useState('');
  const [role, setRoleOfTheUser] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter()
  const handleOpenModal = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setRandomCode(code);
    setConfirmationCode('');
    setError('');
    setOpenModal2(true);
  };
  async function deleteUser() {
    const baseUrl = 'https://estethmarat-estethmarat794-2085-estethmarats-projects.vercel.app/api/v1';

    let endpoint = '';
    switch (role) {
      case 'charityOrganization':
        endpoint = `${baseUrl}/charityOrganizations/${idOfTheUser}`;
        break;
      case 'company':
        endpoint = `${baseUrl}/companies/${idOfTheUser}`;
        break;
      case 'investor':
        endpoint = `${baseUrl}/investors/${idOfTheUser}`;
        break;
      case 'supportOrganization':
        endpoint = `${baseUrl}/supportOrganizations/${idOfTheUser}`;
        break;
      default:
        console.error('   لا يوجد role واضح  ');
        return;
    }
    try {
      setLoading(true)
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `فشل الحذف - كود الحالة: ${response.status}`);
      }
      console.log('تم حذف المستخدم بنجاح');
      setConfirmationCode('');
      setLoading(false)
      setOpenModal2(false);
      toast.custom((t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-[#00F560]">
                  تم حذف الحساب بنجاح
                  
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-green-500">
            <button
              onClick={() => { toast.dismiss(t.id); toast.dismiss(t.id); toast.dismiss(t.id) }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Close
            </button>
          </div>
        </div>
      ), { duration: 5000 })
      logout();
    } catch (error) {
      setLoading(false)
      setOpenModal2(false);
      setConfirmationCode('');
      toast.custom((t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter  backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-red-600">
                  لم يتم حذف الحساب , حاول تاني
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-red-500">
            <button
              onClick={() => { toast.dismiss(t.id); toast.dismiss(t.id); toast.dismiss(t.id) }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Close
            </button>
          </div>
        </div>
      ), { duration: 5000 })
      console.error('حدث خطأ أثناء الحذف:', error.message);
      console.log(error)
    }
  }
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    await new Promise((resolve) => setTimeout(resolve, 300));
    router.push("/Login")
    dispatch(clearUserRole());
    dispatch(clearUserToken());
    dispatch(clearUserid());
    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full  bg-gray-700  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-lg rounded-lg border-[#00F560] pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-[#00F560]">
                you logged out
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-green-500">
          <button
            onClick={() => { toast.dismiss(t.id); toast.dismiss(t.id); toast.dismiss(t.id) }}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Close
          </button>
        </div>
      </div>
    ), { duration: 5000 })
    // إعادة توجيه المستخدم لصفحة تسجيل الدخول
  }



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };



  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu disableScrollLock
      PaperProps={{
        sx: {
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          color: "#fff",
          backgroundColor: "rgba(7, 21, 45, 0.3)",
          backdropFilter: "blur(10px)",
          backgroundClip: "padding-box",
        },
      }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
     { <MenuItem onClick={() => { handleMenuClose(); goToProfilePage(); }}>Profile</MenuItem>}
 
      {/* <MenuItem onClick={() => { handleMenuClose(); goToEditPage(); }}>edit profile</MenuItem> */}
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
     {  <MenuItem onClick={() => { handleMenuClose(); logout(); }}>
        log Out
      </MenuItem>}



       <div className="relative" style={{ direction: "rtl" }}>
        {/* <Modal
          dismissible
          show={openModal2}
          onClose={() => setOpenModal2(false)}
          className="bg-black bg-opacity-80  backdrop-blur-sm"
        >
          <Modal.Header className="bg-black border  border-b border-green-400">
            <p className="text-white">  أنت على وشك حذف حسابك نهائيا  </p>
          </Modal.Header>
          <Modal.Body className="bg-black border-x border-green-300 text-white">
            <div className="space-y-6">

            </div>
          </Modal.Body>
          <Modal.Footer className="bg-black  border  border-t border-green-300">
            <button
              className="hover:bg-[#00F560]  me-2 mb-2  focus:outline-none rounded-full bg-green-400 text-white font-semibold px-4 py-2 "
              onClick={() => setOpenModal2(false)}
            >
              تأكيد
            </button>
          </Modal.Footer>

        </Modal> */}

        <Modal  
          dismissible
          show={openModal2}
          onClose={() => setOpenModal2(false)}
          className="bg-black bg-opacity-80 backdrop-blur-sm"
        >
          {/* <Modal.Header  className="bg-black border  border-b border-green-400">
            <p   className="text-white text-center ">أنت على وشك حذف حسابك نهائيًا</p>
          </Modal.Header> */}
<Modal.Header     className="bg-black border border-b border-green-400 flex justify-center items-center">
  <p className="text-white text-center">أنت على وشك حذف حسابك نهائيًا</p>
</Modal.Header>
          <Modal.Body className="bg-black border-x border-green-300 text-white">
            <div style={{ direction: "rtl" }} className="space-y-6">
              <p>يرجى كتابة الرقم التالي للتأكيد: <span className="font-bold text-green-400">{randomCode}</span></p>
              <input
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="bg-transparent border  border-green-300  text-lg rounded-full py-3   focus:border-green-500 block w-full p-2.5 placeholder-gray-400 text-white focus:ring-green-500 "
                placeholder="أدخل الرقم هنا"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </Modal.Body>

          <Modal.Footer className="bg-black border border-t border-green-300">
            <button
              className="hover:bg-[#00F560] me-2 mb-2 focus:outline-none rounded-full bg-green-400 text-white font-semibold px-4 py-2"
              onClick={() => {
                if (confirmationCode === randomCode) {
                  deleteUser();  // ⬅️ استدعاء الدالة اللي بتحذف اليوزر

                } else {
                  setError("الرقم غير صحيح، حاول مرة أخرى.");
                }
              }}
            >
              تأكيد{loading && <Spinner color="info" aria-label="Info spinner example" />}
            </button>
          </Modal.Footer>
        </Modal>

      </div>



    {   <MenuItem
        onClick={() => {
          handleMenuClose();
          handleOpenModal();
        }} //logout();
        sx={{ color: 'red' }}
      >
        Delete Account
      </MenuItem>}
    </Menu>
  );



  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu disableScrollLock
      PaperProps={{
        sx: {
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          color: "#fff",
          backgroundColor: "rgba(7, 21, 45, 0.3)",
          backdropFilter: "blur(10px)",
          backgroundClip: "padding-box",
        },
      }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
{<MenuItem onClick={() => router.push('/notifications')}>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        {/* <Badge badgeContent={17} color="error">
          <NotificationsIcon />
        </Badge> */}
        <Badge variant="dot" color="error">
  <NotificationsIcon />
</Badge>
      </IconButton>
      <p>Notifications</p>
    </MenuItem>}
    { <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>}  
    </Menu>
  );

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const result = await dispatch(fetchUserId()).unwrap();
  //       const userId = result;
  //       if (!userId) throw new Error("User ID is null");
  //       setIdOfTheUser(userId)
  //       const result2 = await dispatch(fetchUserToken()).unwrap();
  //       const token = result2;
  //       if (!token) throw new Error("User Token is null");
  //       setTokenOfTheUser(token)
  //       const result3 = await dispatch(fetchUserRole()).unwrap();
  //       const role = result3;
  //       if (!role) throw new Error("User Role is null");
  //       setRoleOfTheUser(role)
  //     } catch (err) {
  //       setError(err.message);
  //       console.error('فشل في جلب البيانات:', err);
  //     }
  //   };
  //   fetchUserData();
  // }, [dispatch]);






  useEffect(() => {
  const fetchUserData = async () => {
    try {
      const tokenResult = await dispatch(fetchUserToken()).unwrap();
      if (!tokenResult) {
        console.log("مستخدم زائر (لا يوجد توكن)");
        setTokenOfTheUser(null);
        setRoleOfTheUser("guest");
        setIdOfTheUser(null);
        return;
      }

      setTokenOfTheUser(tokenResult);

      const roleResult = await dispatch(fetchUserRole()).unwrap();
      setRoleOfTheUser(roleResult || "guest");

      const idResult = await dispatch(fetchUserId()).unwrap();
      if (!idResult) {
        console.log("مستخدم بدون ID، ممكن يكون زائر");
        setIdOfTheUser(null);
        return;
      }

      setIdOfTheUser(idResult);
    } catch (err) {
      setError(err.message);
      console.error("فشل في جلب البيانات:", err);
    }
  };

  fetchUserData();
}, [dispatch]);













  // function goToProfilePage(){
  //   router.push("/startUpProfile")

  // }

  function goToProfilePage() {
    if (!role) {
      router.push("/Login");
      return;
    }

    let path = "";

    switch (role) {
      case "company":
        path = "/startUpProfile";
        break;
      case "charityOrganization":
        path = "/charityProfile";
        break;
      case "investor":
        path = "/investorProfile";
        break;
      case "supportOrganization":
        path = "/IncubatorProfile";
        break;
      default:
        console.error("Unknown role:", role);
        router.push("/Login");
        return;
    }

    router.push(path);
  }


  function goToEditPage() {
    if (!role) {
      router.push("/Login");
      return;
    }

    let path = "";

    switch (role) {
      case "company":
        path = "/startupEdit";
        break;
      case "charityOrganization":
        path = "/charityEdit";
        break;
      case "investor":
        path = "/investorEdit";
        break;
      case "supportOrganization":
        path = "/supportOrganizationEdit";
        break;
      default:
        console.error("Unknown role:", role);
        router.push("/Login");
        return;
    }

    router.push(path);
  }



  return (
    <HideOnScroll >
      <AppBar position="fixed" sx={{
        zIndex: 1300,
        backgroundColor: "rgba(7, 21, 45, 0.3)",
        backdropFilter: "blur(10px)",
        backgroundClip: "padding-box",
      }} dir="rtl">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href={"/"} className="hidden md:flex " ><img src={"/assits/logo2.png"} className='w-[100px]' alt="" />

              {/* <Typography
                variant="h6"
                noWrap
                component="p"
                sx={{
                  alignItems: "center",
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography> */}
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton> 
              <Menu disableScrollLock
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
                PaperProps={{
                  sx: {
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    color: "#fff",
                    backgroundColor: "rgba(7, 21, 45, 0.3)",
                    backdropFilter: "blur(10px)",
                    backgroundClip: "padding-box",
                  },
                }}
              >
                




                  <MenuItem onClick={() => { handleCloseNavMenu(); router.push('/savedProfiles') }}>
                    <Typography sx={{ textAlign: 'center' }}><p className={`  ${vazir.className}`}>                  الملفات المحفوظه
 </p></Typography>
                  </MenuItem>
                
             


                  <MenuItem onClick={() => { handleCloseNavMenu(); router.push('/search/a') }}>
                    <Typography sx={{ textAlign: 'center' }}> <p className={`  ${vazir.className}`}>  البحث </p></Typography>
                  </MenuItem>
                
              
 
                
              </Menu>
            </Box>
            <Link href={"/"} className="flex md:hidden flex-grow" ><img src={"/assits/logo2.png"} className='w-[100px]' alt="" />

              {/* <Typography
                variant="h5"
                noWrap
                component="p"
                sx={{
                  alignItems: "center",
                  display: { xs: 'flex', md: 'none' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography> */}
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button className={`  ${vazir.className}`}
                   onClick={() => { handleCloseNavMenu(); router.push('/savedProfiles') }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                ><p className={`  ${vazir.className}`}>                  الملفات المحفوظه
 </p>
                </Button>
                                <Button
                  onClick={() => { handleCloseNavMenu(); router.push('/search/a') }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                 <p className={`  ${vazir.className}`}>  البحث </p>
                </Button>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={1} color="error">
                  <MailIcon />
                </Badge>
              </IconButton> */}
            {  <IconButton onClick={() => router.push('/notifications')}
                size="large"
                aria-label="show  new notifications"
                color="inherit"
              >
                <Badge variant="dot" color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>}
{              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
        {renderMobileMenu}
        {renderMenu}
      </AppBar>
    </HideOnScroll>
  );
}
export default ResponsiveAppBar;