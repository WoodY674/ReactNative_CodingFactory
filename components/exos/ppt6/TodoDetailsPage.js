import {
    Text, SafeAreaView, TouchableOpacity, Image
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {stylesForm} from "../ppt4/Form";

const uriImg = "data:image/png;base64,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"

export const TodoDetailsPage = ({route, navigation}) => {
    const {name, index} = route.params

    const goBack = useCallback(()=>{
        navigation.goBack()
    },[navigation])

    return (
        <SafeAreaView>
            <TouchableOpacity style={{height:60, width:60}} onPress={goBack}>
                <Image
                    source={{uri:uriImg}}
                    style={{height:60, width:60}}
                />
            </TouchableOpacity>
            <Text>Ma todo :</Text>
            <Text>{name}</Text>
        </SafeAreaView>
    )

}
