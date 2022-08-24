import * as Icons from 'react-bootstrap-icons';
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { useNavigate } from 'react-router-dom';
import Brand from '../components/Brand';
import { useAuth } from "../contexts/AuthContext";

function SideBar() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    return (
        <SidebarMenu
            exclusiveExpand={true}
            collapseOnSelect={true}
            onSelect={navigate}
            variant="dark"
            bg="dark"
            rtl={false}
            expand="xs"
            defaultExpanded={false}
            className="h-100" >

            <SidebarMenu.Collapse style={{ position: "sticky", top: 0 }}>

                <SidebarMenu.Header>
                    <SidebarMenu.Brand>
                        <Brand />
                    </SidebarMenu.Brand>
                    <SidebarMenu.Toggle />
                </SidebarMenu.Header>

                <SidebarMenu.Body>
                    <SidebarMenu.Nav>

                        <SidebarMenu.Nav.Link eventKey="animes">
                            <SidebarMenu.Nav.Icon><Icons.GridFill /></SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>All Animes</SidebarMenu.Nav.Title>
                        </SidebarMenu.Nav.Link>

                        <SidebarMenu.Nav.Link eventKey="latest">
                            <SidebarMenu.Nav.Icon><Icons.CalendarWeekFill /></SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Latest updates</SidebarMenu.Nav.Title>
                        </SidebarMenu.Nav.Link>

                        <SidebarMenu.Nav.Link eventKey="seasons">
                            <SidebarMenu.Nav.Icon><Icons.CollectionFill /></SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Seasons</SidebarMenu.Nav.Title>
                        </SidebarMenu.Nav.Link>

                        <SidebarMenu.Nav.Link eventKey="characters">
                            <SidebarMenu.Nav.Icon><Icons.PeopleFill /></SidebarMenu.Nav.Icon>
                            <SidebarMenu.Nav.Title>Characters</SidebarMenu.Nav.Title>
                        </SidebarMenu.Nav.Link>


                        <SidebarMenu.Sub>
                            <SidebarMenu.Sub.Toggle>
                                <SidebarMenu.Nav.Icon />
                                <SidebarMenu.Nav.Title>Ranking</SidebarMenu.Nav.Title>
                            </SidebarMenu.Sub.Toggle>
                            <SidebarMenu.Sub.Collapse>

                                <SidebarMenu.Nav.Link eventKey="ar_rank">
                                    <SidebarMenu.Nav.Icon>Ar</SidebarMenu.Nav.Icon>
                                    <SidebarMenu.Nav.Title>Arabic ranking</SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>

                                <SidebarMenu.Nav.Link eventKey="gb_rank">
                                    <SidebarMenu.Nav.Icon>Gb</SidebarMenu.Nav.Icon>
                                    <SidebarMenu.Nav.Title>Global ranking</SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>

                            </SidebarMenu.Sub.Collapse>
                        </SidebarMenu.Sub>

                        {currentUser &&
                            <SidebarMenu.Sub >
                                <SidebarMenu.Sub.Toggle>
                                    <SidebarMenu.Nav.Icon />
                                    <SidebarMenu.Nav.Title>My Lists</SidebarMenu.Nav.Title>
                                </SidebarMenu.Sub.Toggle>
                                <SidebarMenu.Sub.Collapse>

                                    <SidebarMenu.Nav.Link eventKey="favorites">
                                        <SidebarMenu.Nav.Icon><Icons.HeartFill /></SidebarMenu.Nav.Icon>
                                        <SidebarMenu.Nav.Title>Favorites</SidebarMenu.Nav.Title>
                                    </SidebarMenu.Nav.Link>

                                    <SidebarMenu.Nav.Link eventKey="watched">
                                        <SidebarMenu.Nav.Icon><Icons.CheckCircleFill /></SidebarMenu.Nav.Icon>
                                        <SidebarMenu.Nav.Title>Watched</SidebarMenu.Nav.Title>
                                    </SidebarMenu.Nav.Link>

                                    <SidebarMenu.Nav.Link eventKey="watching">
                                        <SidebarMenu.Nav.Icon><Icons.PlayCircleFill /></SidebarMenu.Nav.Icon>
                                        <SidebarMenu.Nav.Title>Watching</SidebarMenu.Nav.Title>
                                    </SidebarMenu.Nav.Link>

                                    <SidebarMenu.Nav.Link eventKey="plan_to_watch">
                                        <SidebarMenu.Nav.Icon><Icons.ClockFill /></SidebarMenu.Nav.Icon>
                                        <SidebarMenu.Nav.Title>Plan to watch</SidebarMenu.Nav.Title>
                                    </SidebarMenu.Nav.Link>

                                    <SidebarMenu.Nav.Link eventKey="on_hold">
                                        <SidebarMenu.Nav.Icon><Icons.PauseCircleFill /></SidebarMenu.Nav.Icon>
                                        <SidebarMenu.Nav.Title>On Hold</SidebarMenu.Nav.Title>
                                    </SidebarMenu.Nav.Link>

                                    <SidebarMenu.Nav.Link eventKey="dropped">
                                        <SidebarMenu.Nav.Icon><Icons.XCircleFill /></SidebarMenu.Nav.Icon>
                                        <SidebarMenu.Nav.Title>Dropped</SidebarMenu.Nav.Title>
                                    </SidebarMenu.Nav.Link>

                                    <SidebarMenu.Nav.Link eventKey="custom">
                                        <SidebarMenu.Nav.Icon><Icons.PencilFill /></SidebarMenu.Nav.Icon>
                                        <SidebarMenu.Nav.Title>Custom List</SidebarMenu.Nav.Title>
                                    </SidebarMenu.Nav.Link>

                                </SidebarMenu.Sub.Collapse>
                            </SidebarMenu.Sub>}


                        <SidebarMenu.Sub >
                            <SidebarMenu.Sub.Toggle>
                                <SidebarMenu.Nav.Icon />
                                <SidebarMenu.Nav.Title>Community</SidebarMenu.Nav.Title>
                            </SidebarMenu.Sub.Toggle>
                            <SidebarMenu.Sub.Collapse>

                                <SidebarMenu.Nav.Link eventKey="news">
                                    <SidebarMenu.Nav.Icon><Icons.Newspaper /></SidebarMenu.Nav.Icon>
                                    <SidebarMenu.Nav.Title>News</SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>

                                <SidebarMenu.Nav.Link eventKey="suggestions">
                                    <SidebarMenu.Nav.Icon><Icons.CheckCircleFill /></SidebarMenu.Nav.Icon>
                                    <SidebarMenu.Nav.Title>Suggestions</SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>

                                <SidebarMenu.Nav.Link eventKey="release_dates">
                                    <SidebarMenu.Nav.Icon><Icons.CalendarDateFill /></SidebarMenu.Nav.Icon>
                                    <SidebarMenu.Nav.Title>Release Dates</SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>

                                <SidebarMenu.Nav.Link eventKey="discussions">
                                    <SidebarMenu.Nav.Icon><Icons.ChatDotsFill /></SidebarMenu.Nav.Icon>
                                    <SidebarMenu.Nav.Title>Disucssions</SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>

                            </SidebarMenu.Sub.Collapse>
                        </SidebarMenu.Sub>

                        {currentUser &&
                            <SidebarMenu.Nav.Link eventKey="history">
                                <SidebarMenu.Nav.Icon><Icons.ClockHistory /></SidebarMenu.Nav.Icon>
                                <SidebarMenu.Nav.Title>History</SidebarMenu.Nav.Title>
                            </SidebarMenu.Nav.Link>}

                        {currentUser &&
                            <SidebarMenu.Nav.Link eventKey="profile">
                                <SidebarMenu.Nav.Icon><Icons.PersonCircle /></SidebarMenu.Nav.Icon>
                                <SidebarMenu.Nav.Title>Profile</SidebarMenu.Nav.Title>
                            </SidebarMenu.Nav.Link>}

                        {currentUser ?
                            <SidebarMenu.Nav.Link eventKey="logout">
                                <SidebarMenu.Nav.Icon><Icons.BoxArrowLeft /></SidebarMenu.Nav.Icon>
                                <SidebarMenu.Nav.Title>Logout</SidebarMenu.Nav.Title>
                            </SidebarMenu.Nav.Link>
                            :
                            <SidebarMenu.Nav.Link eventKey="login">
                                <SidebarMenu.Nav.Icon><Icons.BoxArrowInRight /></SidebarMenu.Nav.Icon>
                                <SidebarMenu.Nav.Title>login</SidebarMenu.Nav.Title>
                            </SidebarMenu.Nav.Link>
                        }



                    </SidebarMenu.Nav>
                </SidebarMenu.Body>

                <SidebarMenu.Footer>
                </SidebarMenu.Footer>


            </SidebarMenu.Collapse>
        </SidebarMenu >
    )
}

export default SideBar;