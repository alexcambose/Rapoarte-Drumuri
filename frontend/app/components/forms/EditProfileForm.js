import React from 'react';
import { Picker, View, DatePickerAndroid, Alert } from "react-native";
import EditProfileFormStyle from "../../styles/screens/EditProfile"
import { CLocationPicker, CText, CButton, CTextInput } from "../core/index";
import { saveProfile } from "../../utils/func";
import UserStore from '../../stores/UserStore';
import { updateUser } from "../../actions";
import CActivityIndicator from "../core/CActivityIndicator";

const cars = ["","ABT", "AC Schnitzer", "Acura", "Alfa Romeo", "Alpina", "Arrinera", "Artega", "Ascari", "Aston Martin", "Audi", "BMW", "Bentley", "Bertone", "Brabus", "Breckland", "Bugatti", "Buick", "Cadillac", "Caparo", "Carlsson", "Caterham", "Chevrolet", "Chrysler", "Citroen", "Covini", "Dacia", "Daewoo", "Daihatsu", "Daimler", "De Tomaso", "Devon", "Dodge", "Donkervoort", "EDAG", "Edo", "Elfin", "Eterniti", "FM Auto", "FPV", "Farbio", "Ferrari", "Fiat", "Fisker", "Ford", "GM", "GMC", "GTA", "Gordon Murray", "Gumpert", "HSV", "Hamann", "Hennessey", "Holden", "Honda", "Hummer", "Hyundai", "Icona", "Infiniti", "Isuzu", "Italdesign", "Iveco", "Jaguar", "Jeep", "KTM", "Kia", "Kleemann", "Koenigsegg", "LCC", "Lada", "Lamborghini", "Lancia", "Land Rover", "Leblanc", "Lexus", "Lincoln", "Lobini", "Loremo", "MG", "Mansory", "Marcos", "Maserati", "Maybach", "Mazda", "Mazel", "McLaren", "Mercedes-Benz", "Mercury", "Mindset", "Mini", "Mitsubishi", "Mitsuoka", "Morgan", "Nismo", "Nissan", "Noble", "ORCA", "Oldsmobile", "Opel", "PGO", "Pagani", "Panoz", "Peugeot", "Pininfarina", "Plymouth", "Pontiac", "Porsche", "Proton", "Qoros", "Renault", "Rinspeed", "Rolls-Royce", "Rover", "Saab", "Saleen", "Saturn", "Scion", "Seat", "Singer", "Skoda", "Smart", "Spada", "Spyker", "SsangYong", "Startech", "Stola", "Strosek", "StudioTorino", "Subaru", "Suzuki", "TVR", "TechArt", "Tesla", "Think", "Toyota", "Tramontana", "Valmet", "Vauxhall", "Venturi", "Volkswagen", "Volvo", "Wald", "Wiesmann", "Yes", "Zagato", "Zenvo",];
const counties = ['','Alba', 'Arad', 'Argeş', 'Bacău', 'Bihor', 'Bistriţ', 'Botoşani', 'Braşov', 'Brăila', 'Buzău', 'Cara', 'Călăraşi', 'Cluj', 'Constanţa', 'Covasna', 'Dâmboviţa', 'Dolj', 'Galaţi', 'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara', 'Ialomiţa', 'Iaşi', 'Ilfov', 'Maramureş', 'Mehedinţi', 'Mureş', 'Neamţ', 'Olt', 'Prahova', 'Satu Mare' , 'Sălaj', 'Sibiu', 'Suceava', 'Teleorman', 'Timiş', 'Tulcea', 'Vaslui', 'Vâlcea', 'Vrancea',];


class EditProfileForm extends React.Component{
    constructor(){
        super();
        const { car, county, address, sex, birthday, phone } = UserStore.get();
        this.state = {
            fetching: false,
            car,
            county,
            address,
            sex,
            birthday,
            phone
        };
    }
    selectBirthday(){
        try {
            DatePickerAndroid.open({
                date: new Date()
            }).then(res => {
                const { day, month, year } = res;
                if(res.action === 'dismissedAction') this.setState({birthday: ''});
                else this.setState({birthday: {day, month, year}});
            });
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    save(){
        const { car, county, address, sex, birthday, phone } = this.state;
        this.setState({fetching: true});
        saveProfile(this.state, 'info')
            .then(() => {
                this.setState({fetching: false});
                updateUser({ car, county, address, sex, birthday, phone});
                Alert.alert('Succes', 'Informatiile au fost salvate!');
            })
            .catch(err => alert(err));
    }
    render(){
        const { birthday, phone, fetching } = this.state;
        const pickerCars = cars.map((e,i)=> <Picker.Item label={e} value={e} key={i} /> );
        const pickerCounties = counties.map((e,i)=> <Picker.Item label={e} value={e} key={i} /> );
        return (
            <View style={EditProfileFormStyle.view}>
                <CText color={EditProfileFormStyle.$textColor} >Masina</CText>
                <Picker
                    prompt="Marca masinii tale"
                    selectedValue={this.state.car}
                    onValueChange={(itemValue, itemIndex) => this.setState({car: itemValue})}>
                    {pickerCars}
                </Picker>

                <CText color={EditProfileFormStyle.$textColor} >Judet</CText>
                <Picker
                    prompt="Judetul tau"
                    selectedValue={this.state.county}
                    onValueChange={(itemValue, itemIndex) => this.setState({county: itemValue})}>
                    {pickerCounties}
                </Picker>

                <CText color={EditProfileFormStyle.$textColor} >Numar de telefon</CText>
                <CTextInput
                    onEndEditing={phone => this.setState({phone})}
                    initialValue={phone}
                    maxLength={10}
                    keyboardType="name-phone-pad"
                />

                <CText color={EditProfileFormStyle.$textColor} >Adresa: {this.state.address}</CText>
                <CLocationPicker
                    onSave={address => this.setState({address})}
                />

                <CText color={EditProfileFormStyle.$textColor} >Sex: </CText>
                <Picker
                    selectedValue={this.state.sex}
                    onValueChange={(itemValue, itemIndex) => this.setState({sex: itemValue})}>
                    <Picker.Item label={''} value={''}/>
                    <Picker.Item label={'Barbat'} value={1}/>
                    <Picker.Item label={'Femeie'} value={0}/>
                </Picker>
                <View style={EditProfileFormStyle.birthdayView}>
                    <View style={EditProfileFormStyle.birthdayTextView}>
                        <CText color={EditProfileFormStyle.$textColor} >Data de nastere: </CText>
                    </View>
                    <View style={EditProfileFormStyle.birthdayButtonView}>
                        <CButton label={(birthday ? birthday.day + '.' + birthday.month + '.' + birthday.year : "Selecteaza")} onPress={()=>this.selectBirthday()}/>
                    </View>
                </View>

                {fetching ? <CActivityIndicator/> : <CButton label="Salveaza" onPress={()=>this.save()}/> }
            </View>
        );
    }
}

export default EditProfileForm;