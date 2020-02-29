import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { AppBar,
         Toolbar,
         Typography,
         IconButton,
         Menu,
         MenuItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '10',
  },
  title: {
    flexGrow: 1,
  },
}

function Navbar() {
  const auth = true
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" style={styles.menuButton} color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={styles.title}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar
