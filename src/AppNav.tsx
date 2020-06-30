import React from 'react'
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Typography,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  AppBar as MaterialUiAppBar,
  SwipeableDrawer as MaterialUiSwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu";
import AppNavItem from './AppNavItem'


const appBarStyles = (theme: Theme) => createStyles({
  sectionButton: {
    marginLeft: theme.spacing(2)
  }
})

interface AppBarProps extends WithStyles<typeof appBarStyles> {
  items: AppNavItem[],
  openDrawer: () => void
}

const _AppBar = class extends React.Component<AppBarProps, {}> {
  render() {
    const {classes} = this.props;
    return (
      <MaterialUiAppBar position="relative">
        <Toolbar>
          {/* Hide hamburger menu icon on larger devices */}
          <Hidden smUp={true}>
            <IconButton edge="start" color="inherit" onClick={e => {
              e.preventDefault();
              this.props.openDrawer()
            }}>
              <MenuIcon/>
            </IconButton>
          </Hidden>
          <Typography variant="h6" color="inherit" noWrap>
            Herr あし
          </Typography>
          {/* Hide app bar menu items on smaller devices */}
          <Hidden xsDown={true}>
            {this.props.items.map(({text, icon, action}, i) => {
                return (
                  <Button
                    key={i}
                    color="inherit"
                    startIcon={icon}
                    className={classes.sectionButton}
                    onClick={action}
                  >{text}</Button>
                )
              }
            )}
          </Hidden>
        </Toolbar>
      </MaterialUiAppBar>
    )
  }
}

const AppBar = withStyles(appBarStyles)(_AppBar)

interface SwipeableDrawerProps {
  items: AppNavItem[],
  isDrawerOpen: boolean,
  closeDrawer: () => void
}

class SwipeableDrawer extends React.Component<SwipeableDrawerProps, {}> {
  render() {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    return (
      <MaterialUiSwipeableDrawer
        open={this.props.isDrawerOpen}
        // tslint:disable-next-line
        onOpen={() => {}}
        onClose={() => {
          this.props.closeDrawer()
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <List style={{
          width: 240
        }}>
          {this.props.items.map(({text, icon, action}, i) => {
              return (
                <ListItem button onClick={action} key={i}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text}/>
                </ListItem>
              )
            }
          )}
        </List>
      </MaterialUiSwipeableDrawer>
    )
  }
}

interface AppNavProps {
  items: AppNavItem[],
  children: React.ReactChildren
}

interface AppNavState {
  isDrawerOpen: boolean,
}

class AppNav extends React.Component<AppNavProps, AppNavState> {
  constructor(props: AppNavProps) {
    super(props);
    this.state = {
      isDrawerOpen: false
    }
  }

  render() {
    return (
      <React.Fragment>
        <AppBar
          items={this.props.items}
          openDrawer={() => {
            this.setState({isDrawerOpen: true})
          }}
        />
        <SwipeableDrawer
          items={this.props.items}
          isDrawerOpen={this.state.isDrawerOpen}
          closeDrawer={() => {
            this.setState({isDrawerOpen: false})
          }}
        />
      </React.Fragment>
    )
  }
}

export default AppNav
