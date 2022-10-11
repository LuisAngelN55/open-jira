import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import Typography from '@mui/material/Typography';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const Sidebar = () => {
  return (
    <Drawer
        anchor="left"
        open= { false }
        onClose={ ()=> console.log('cerrando drawer')}
    >

        <Box sx={{ width: 250 }}>

            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant="h4">Menú</Typography>
            </Box>

            <List>
                {
                    menuItems.map( (text, index) => (
                        <ListItem button key={ text }>
                            <ListItemIcon>
                                { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText primary={ text } />
                        </ListItem>
                    ))
                }
            </List>

            <Divider />

            <List>
                {
                    menuItems.map( (text, index) => (
                        <ListItem button key={ text }>
                            <ListItemIcon>
                                { index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />}
                            </ListItemIcon>
                            <ListItemText primary={ text } />
                        </ListItem>
                    ))
                }
            </List>

        </Box>


    </Drawer>
  )
}