import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Particles from 'react-particles-js';
import ImageForm from './Components/ImageForm/ImageForm';
import UserRank from './Components/UserRank/UserRank';
import FaceRecognitionImage from './Components/FaceRecognitionImage/FaceRecognitionImage';
import SignInForm from './Components/SignInForm/SignInForm';
import Register from './Components/Register/Register';

const bgparams = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 400
            }
        },
        "size": {
            "value": 3
        }
    }
}

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            inputurl: '',
            file_image_path: '',
            file_upload_size: 0,
            box: [],
            route: 'signIn',
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joinedOn: ''
            }
        }
    }

    componentDidMount() {
        this.removePreviousCreatedFaceBox();
    }

    loadUser = (data) => {

        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joinedOn: data.joinedOn
            }
        })

    }

    onInputChange = (e) => {
        this.removePreviousCreatedFaceBox();
        this.cleanFileUpload();
        this.setState({
            inputurl: e.target.value,
        })
    }

    faceDetector = (data) => {
        let inputimage;
        if (this.state.inputurl !== '') {
            inputimage = document.getElementById('inputimage');
        }
        else if (this.state.file_image_path !== '') {
            inputimage = document.getElementById('uploaded_image');
        }

        let imageheight = Number(inputimage.height);
        let imagewidth = Number(inputimage.width);

        let faceRegionArray = [];

        data.outputs[0] &&
            data.outputs[0].data.regions.map((region, index) => {
                let clarifaiFace = region.region_info.bounding_box;
                let boxCalculated = {
                    left_col: clarifaiFace.left_col * imagewidth,
                    top_row: clarifaiFace.top_row * imageheight,
                    right_col: imagewidth - (clarifaiFace.right_col * imagewidth),
                    bottom_row: imageheight - (clarifaiFace.bottom_row * imageheight)
                }
                faceRegionArray.push(boxCalculated);

                return null;

            })

        this.setState({
            box: faceRegionArray
        })

    }

    onButtonDetect = () => {

        this.removePreviousCreatedFaceBox();

        if (this.state.inputurl !== '' && this.state.file_image_path !== '') {
            alert('Please use either image link or image file upload')
        }
        else if (this.state.inputurl === '' && this.state.file_image_path === '') {
            alert('Please provide valid image url...')
        }
        else if (this.state.inputurl !== '') {
            document.getElementById('LoadingIndicator').style.display = 'block';
            fetch('https://guarded-bastion-64378.herokuapp.com/imageUrl', {
                method: 'post',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    inputurl: this.state.inputurl,
                    fileUpload: 0
                })
            })
                .then(response => response.json())
                .then((response) => {
                    if (response) {
                        fetch('https://guarded-bastion-64378.herokuapp.com/image', {
                            method: 'put',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                id: this.state.user.id
                            })
                        })
                            .then(response => response.json())
                            .then(count => this.setState(
                                Object.assign(this.state.user, { entries: count })
                            ))
                    }

                    document.getElementById('LoadingIndicator').style.display = 'none';
                    this.faceDetector(response);

                })
                .catch((err) => console.log(err))

            document.getElementById('FaceRecognitionImage').style.display = 'block';


        }
        else {
            if (this.state.file_upload_size < 50000) {
                document.getElementById('LoadingIndicator').style.display = 'block';
                //console.log(document.getElementById("#uploaded_image").value);
                var wholePath = document.getElementById('uploaded_image').src;
                var b64image = wholePath.split(';')[1];
                var b64path = b64image.split(',')[1];
                fetch('https://guarded-bastion-64378.herokuapp.com/imageUrl', {
                    method: 'post',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        inputurl: b64path,
                        fileUpload: 1
                    })
                })
                    .then(response => response.json())
                    .then((response) => {
                        if (response) {
                            fetch('https://guarded-bastion-64378.herokuapp.com/image', {
                                method: 'put',
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify({
                                    id: this.state.user.id
                                })
                            })
                                .then(response => response.json())
                                .then(count => this.setState(
                                    Object.assign(this.state.user, { entries: count })
                                ))
                        }

                        document.getElementById('LoadingIndicator').style.display = 'none';
                        this.faceDetector(response);

                    })
                    .catch((err) => console.log(err))

                document.getElementById('FaceRecognitionImage').style.display = 'block';
            }
            else {
                alert("Please select an image of size less than 50kb")
            }
        }
    }

    onRoutChange = (route) => {
        if (route === 'siginIn') {
            this.setState({
                inputurl: '',
                box: [],
                route: 'signIn',
                user: {
                    id: '',
                    name: '',
                    email: '',
                    entries: 0,
                    joinedOn: ''
                }
            })
        }
        else {
            this.setState({
                route: route
            })
        }

    }

    removePreviousCreatedFaceBox = () => {

        //removing previous created face box if any
        let imagedisplayElement = document.querySelectorAll('.bounding-box');
        if (imagedisplayElement[0] !== undefined) {
            for (let i = 0; i < imagedisplayElement.length; i++) {
                imagedisplayElement[i].remove(imagedisplayElement[i]);
            }
        }

    }

    cleanFileUpload = () => {
        this.removePreviousCreatedFaceBox();
        document.getElementById('uploaded_image').src = '';
        document.getElementById('imageupload').value = '';
        this.setState({
            file_image_path: ''
        })
    }

    cleanImageUrl = () => {
        this.removePreviousCreatedFaceBox();
        document.getElementById('imagelinkurl').value = '';
        this.setState({
            inputurl: '',
        })
    }

    setFileSize = (size) => {
        this.setState({
            file_upload_size: size
        })
    }

    readImageFile = (e) => {
        this.cleanImageUrl();
        this.removePreviousCreatedFaceBox();
        var preview = document.querySelector('#uploaded_image');
        var file = e.target.files[0];
        var reader = new FileReader();

        this.setFileSize(e.target.files[0].size);

        this.setState({
            file_image_path: e.target.files[0]
        })

        reader.onloadend = function () {
            preview.src = reader.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }

    }

    render() {

        return (
            <div className="App">
                <Particles className="particles"
                    params={bgparams}
                />
                {
                    this.state.route === 'home' ?
                        <Navigation onRoutChange={this.onRoutChange} />
                        : ''
                }

                {
                    this.state.route === 'signIn' ?
                        <SignInForm onRoutChange={this.onRoutChange} loadUser={this.loadUser} />
                        :
                        this.state.route === 'register' ?
                            <Register onRoutChange={this.onRoutChange} loadUser={this.loadUser} />
                            : this.state.route === 'home' ?
                                <div>
                                    <Logo />
                                    <UserRank user={this.state.user} />
                                    <ImageForm
                                        onInputChange={this.onInputChange}
                                        onButtonDetect={this.onButtonDetect}
                                        removePreviousCreatedFaceBox={this.removePreviousCreatedFaceBox}
                                        readImageFile={this.readImageFile}
                                        cleanFileUpload={this.cleanFileUpload}
                                    />
                                    <div id="FaceRecognitionImage">
                                        <FaceRecognitionImage
                                            inputurl={this.state.inputurl}
                                            box={this.state.box}
                                        />
                                    </div>
                                </div>
                                : ''
                }

            </div>

        );
    }
}

export default App;
