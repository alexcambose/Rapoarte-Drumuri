import React from 'react';
import { TouchableOpacity, View, Linking, ScrollView } from "react-native";
import { CText } from "../core/index";
import constants from "../../constants";


class AboutScreen extends React.Component{
    navigate(){
        Linking.openURL(constants.githubProject).catch(err => alert(err));
    }
    render(){
        return (
            <ScrollView style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10}}>
                    <CText style={{fontSize: 24, fontWeight:'bold', borderBottomColor: 'rgba(0,0,0,.1)', borderBottomWidth:1}}>Rapoarte Drumuri</CText>
                    <CText textBreakStrategy="balanced" style={{fontSize: 16, marginTop: 10}}><CText bold>Rapoarte Drumuri</CText> vine in sprijinul șoferilor ce s-au săturat de surprizele neplacute de pe drumurile din Romania.
                        Cu ajutorul acestei aplicații oricine poate semnala un drum inchis, stricat, in reparație sau periculos astfel incat ceilalți soferi să fie informați de problema respectivă.
                    </CText>
                    <CText style={{marginTop: 20}}>Daca ti se pare ca aceasta aplicatie este utila nu uita sa acorzi o nota pe Google Play. Orice recenzie este binevenita!</CText>

                </View>
                <View style={{marginTop: 20, flex:1, justifyContent:'flex-end', alignItems: 'center', marginBottom: 10}}>
                    <CText>Dezvoltator: Alexandru Cambose</CText>
                    <CText>Acest proiect este non-profit si cu sursa deschisa!</CText>
                    <TouchableOpacity onPress={()=>this.navigate()}>
                        <CText style={{color: 'rgba(0,0,255,.5)'}}>GitHub</CText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default AboutScreen;
