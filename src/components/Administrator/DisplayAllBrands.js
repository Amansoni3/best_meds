import React, { useState, useEffect } from "react";
import MaterialTable from "material-table"
import { getData, ServerURL, postDataAndImage, postData } from "./FetchNodeServices";
import { Grid, TextField, Button } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Swal from "sweetalert2";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { makeStyles, styled } from '@mui/styles';


const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 40,

    },
    subdiv: {

        background: '#55efc4',
        padding: 20,
        width: 1000
    },
    inputClasses: {
        display: 'none'
    },
}))


const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#ffffff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#2d3436',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#2d3436',
            borderRadius: 0
        },
        '&:hover fieldset': {
            borderColor: '#2d3436',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff',
        },
    },
});


export default function DisplayAllBrands(props) {

    const classes = useStyles()

    const [listBrands, setListBrands] = useState([])

    const [categories , setCategories] = useState('')
    const [subCategories , setSubCategories] = useState('')
    const [brandName , setBrandName] = useState('')
    const [status , setStatus] = useState('')

    const [brandIcon , setBrandIcon] = useState({byte:'',file:'/uploadicon.png'})
    const [tempBrandIcon , setTempBrandIcon] = useState({byte:'',file:''})


    const [brandId , setBrandId] = useState('') 

    const [listCategories , setListCategories] = useState([])
    const [listSubCategories , setListSubCategories] = useState([])

    const [open, setOpen] = useState(false);
    const [buttonstate, setbuttonstate] = useState(false)


    const fetchAllBrands = async () => {
        var result = await getData('brands/displayallbrands')
        setListBrands(result.result)
    }

    const handleCategoriesChange = (event) => {
        setCategories(event.target.value);
        fetchAllSubCategories(event.target.value)
    };

    const handleSubCategoriesChange = (event) => {
        setSubCategories(event.target.value);
    };


    const fetchAllCategories = async() => {

        var result = await getData('subcategory/fetchallcategories')
        setListCategories(result.result)
    }

    const fetchAllSubCategories = async(categories) => {

        var result = await postData('subcategory/fetchallsubcategoriesbycategoryid',{categoryid:categories})
        setListSubCategories(result.result)
    }

    const fillSubCategories=()=>{

        return(listSubCategories.map((item)=>{
           return(<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem> )
        }))
     }


    const fillCategories=()=>{

        return(listCategories.map((item)=>{
           return(<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem> )
        }))
     }

     useEffect(function(){
        fetchAllBrands()
        fetchAllCategories()
     },[])

     const handleIconChange = (event) => {

        if (event.target.value.length) {
            setBrandIcon({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
            setbuttonstate(true)
        }
    }

    const handleBrandStatusChange = (event) => {
        setStatus(event.target.value);
    };



    const handleEdit = (rowData) => {

        setBrandIcon({byte: '', file: `${ServerURL}/images/${rowData.icon}`})
        setTempBrandIcon({byte: '', file: `${ServerURL}/images/${rowData.icon}`})
        setBrandId(rowData.brandid)

        setCategories(rowData.categoryid)
        setSubCategories(rowData.subcategoryid)
        fetchAllSubCategories(rowData.categoryid)
        setBrandName(rowData.brandname)
        setStatus(rowData.status)

        

        setOpen(true);
    };

    const handleCancel = () => {

        setBrandIcon({ byte: '', file: `${brandIcon.file}` })
        setbuttonstate(false)
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditIcon = async () => {

        var formData = new FormData()

        formData.append('brandid', brandId)
        formData.append('icon', brandIcon.byte)

        setOpen(false)

        var result = await postDataAndImage("brands/editbrandicon", formData)

        if (result.result) {
            Swal.fire({
                icon: 'success',
                title: 'Best Meds',
                text: 'Icon Edited Succesfully',
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
        setbuttonstate(false)
        fetchAllBrands()
    }

    const handleEditData = async() =>{
      
        setOpen(false)

        var body = {categoryid:categories,subcategoryid:subCategories,brandid:brandId,brandname:brandName,status:status}
        
        var result = await postData("brands/editbrand",body)

        if(result.result)
        {
            Swal.fire({
                icon: 'success',
                title: 'Best Meds',
                text: 'Icon Edited Succesfully',
                imageUrl: 'pharmacy.jpg',
                imageHeight: 150,
                imageWidth:150,
                imageAlt: 'Custom image'
            })
  
        }
        else
        {
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
        
        fetchAllBrands()
      }

      const handleDeleteData = async(brandid) =>{

        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
          if (result.isConfirmed) {
  
            var body = {brandid:brandid}
        
            var result = await postData("brands/deletebrands",body)
            
            if(result.result)
            Swal.fire(
              'Deleted!',
              'Department has been deleted.',
              'success'
            )
          
          else
          Swal.fire(
            'Deleted!',
            'Fail To Delete Department.',
            'error'
          )
          }
          fetchAllBrands()
        })
        
      }







    function ShowDailog() {

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent sx={{ backgroundColor: '#55efc4' }}>
                    <Grid container spacing={1}>

                        <Grid item xs={12}>
                            <div style={{ padding: 5, fontSize: 20, fontWeight: 'bold', letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: 'center' }}>
                                <img src="brand.png" height={40} width={40} style={{ padding: 5 }} />
                                Brands Interface
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categories}
                                    label="Categories"
                                    onChange={handleCategoriesChange}

                                >
                                    {fillCategories()}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Sub Categories</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={subCategories}
                                    label="Sub Categories"
                                    onChange={handleSubCategoriesChange}

                                >
                                    {fillSubCategories()}
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={4}>
                            <CssTextField variant='outlined' value={brandName} onChange={(event) => setBrandName(event.target.value)} label='Brand Name' sx={{ input: { color: '#fff' } }} fullWidth />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label1" >Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label1"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={handleBrandStatusChange}
                                >
                                    <MenuItem value={'Top Brand'}>Top Brand</MenuItem>
                                    <MenuItem value={'Trending'}>Trending</MenuItem>
                                    <MenuItem value={'None'}>None</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <label htmlFor="contained-button-file" fullWidth>

                                <input accept="image/*" onChange={(event) => handleIconChange(event)} id="contained-button-file" className={classes.inputClasses} multiple type="file" />

                                <Button variant="contained" component="span" style={{ backgroundColor: '#57606f' }} >
                                    Upload Brand Icon
                                </Button>

                            </label>
                        </Grid>

                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar
                                alt="Upload Image"
                                src={brandIcon.file}
                                sx={{ width: 100, height: 100 }}
                                variant="square"

                            />
                        </Grid>

                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {buttonstate ? <><Button onClick={() => handleEditIcon()}>Save</Button><Button onClick={() => handleCancel()}>Cancel</Button></> : <></>}
                            </Grid>

                        </Grid>

                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#55efc4' }}>
                    <Button onClick={handleEditData}>Edit</Button>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )


    }


    function DisplayAll() {
        return (
            <MaterialTable
                title="List Of Brands"
                columns={[
                    { title: 'Brand Id', field: 'brandid' },
                    { title: 'Category Id', field: 'categoryname' },
                    { title: 'SubCategory', field: 'subcategoryname' },
                    { title: 'Brand Name', field: 'brandname' },
                    { title: 'Status', field: 'status' },
                    {
                        title: 'Brand Icon', field: '',
                        render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 50, borderRadius: '20' }} />
                    },

                ]}
                data={listBrands}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit SubCategory',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete SubCategory',
                         onClick: (event, rowData) => handleDeleteData(rowData.brandid)
                    }
                ]}
            />
        )
    }


    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                {DisplayAll()}
                {ShowDailog()}
            </div>
        </div>
    )




}