import React, { useState } from "react"
import { styled, makeStyles } from "@mui/styles"
import { Grid, TextField, Button } from "@mui/material"
import { flexbox, fontSize, padding } from "@mui/system"
import Avatar from "@mui/material/Avatar"
import { ServerURL, postData, postDataAndImage, getData } from "./FetchNodeServices";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 40,

    },
    subdiv: {
        display: 'flex',
        background: '#55efc4',
        padding: 20,
        width: 600
    },
    inputClasses: {
        display: 'none'
    },




}))

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#2d3436',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#2d3436',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#2d3436',
        },
        '&:hover fieldset': {
            borderColor: '#2d3436',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#596275',
        },
    },
});

export default function Category(props) {

    const classes = useStyles()


    const [categoryIcon, setCategoryIcon] = useState({ byte: '', file: '/uploadicon.png' })
    const [categoryName, setCategoryName] = useState('')

    const handleIconChange = (event) => {
        if (event.target.value.length) {
            setCategoryIcon({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const handleSubmit = async () => {

        var formData = new FormData()

        formData.append('categoryname',categoryName )
        formData.append('icon', categoryIcon.byte)
         

        var result = await postDataAndImage("category/addcategories", formData)
        if (result.result) {

            Swal.fire({
                icon: 'success',
                title: 'Best Meds',
                text: 'Categories Added',
                imageUrl: 'pharmacy.jpg',
                imageHeight: 150,
                imageWidth:150,
                imageAlt: 'Custom image'

            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Best Meds',
                text: 'Failed',
                imageUrl: 'pharmacy.jpg',
                imageHeight: 150,
                imageWidth:150,
                imageAlt: 'Custom image'
            })
        }

        setTimeout(function() {
            {window.location.reload(false)}
         }, 2000);
    }

    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>

                    <Grid item xs={12}>
                        <div style={{ padding: 5, fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: 'center' }}>
                            <img src="categories.png" height={40} width={40} style={{ padding: 5 }} />
                            Category Interface
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <CssTextField variant='outlined' onChange={(event) => setCategoryName(event.target.value)} label='Category Name' sx={{ input: { color: '#2d3436' } }} fullWidth />
                    </Grid>

                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <label htmlFor="contained-button-file" fullWidth>

                            <input accept="image/*" onChange={(event) => handleIconChange(event)} id="contained-button-file" className={classes.inputClasses} multiple type="file" />

                            <Button variant="contained" component="span" style={{ backgroundColor: '#57606f' }} >
                                Upload Category Icon
                            </Button>

                        </label>
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar
                            alt="Upload Image"
                            src={categoryIcon.file}
                            sx={{ width: 100, height: 100 }}
                            variant="square"

                        />
                    </Grid>

                    <Grid item xs={6}>

                        <Button variant="contained" onClick={()=>handleSubmit()} style={{ backgroundColor: '#2c2c54' }} color="success" fullWidth component="span">
                            Save Details
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={() => window.location.reload(false)} variant="contained" type="reset" fullWidth component="span" style={{ backgroundColor: '#2c2c54' }}>
                            Reset All
                        </Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    )
}