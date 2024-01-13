import React from 'react'
import {Card, CardContent, Typography} from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({title, cases, isRed, isPurple, active, total, ...props}) {
    return (
        <Card 
            onClick={props.onClick} 
            className={`infoBox ${active && "infoBox--selected"} 
                        ${active && isRed && "infoBox--red"}
                        ${active && isPurple && "infoBox--purple"}`}> 
            <CardContent>
                <Typography className="infoBox_title" color="textPrimary">
                    {title}
                </Typography>

                <h2 className={`infoBox_cases ${!isRed && !isPurple && "infoBox_cases--green"}
                                ${isPurple && "infoBox_cases--purple"}`}
                                color="textSecondary !important;"
                >{cases} Today</h2>

                <Typography className="infoBox_total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
