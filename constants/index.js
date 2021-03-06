import { normalize } from '../utils'

export const COLORS = {
    turquoise: '#61E2FE',
    blue: '#038cfc',
    darkBlue: '#1d5e8f',
    darkestBlue: '#05375a',
    green: '#37CDA2',
    grey: '#6b6e7b',
    red: '#ee2015',
    black: '#000000',
    placeholder: '#818182',
    orange: '#f4511e',
    error: '#ff190c',
    purple: '#8948ED'
}

export const FONTS = {
    bold: 'MontserratAlternates-Bold',
    medium: 'MontserratAlternates-Medium',
    light: 'MontserratAlternates-Light'
}

export const SPACING = {
    xx_small: normalize(3),
    x_small: normalize(5),
    small:normalize(10),
    medium: normalize(15),
    large: normalize(20),
    x_large: normalize(25),
    xx_large: normalize(30),
    xxx_large: normalize(40),
    button: normalize(50)
}

export const FONT_SIZES = {
    xxx_large: normalize(23),
    xx_large: normalize(21),
    x_large: normalize(18.5),
    large: normalize(16.5),
    medium: normalize(14.5),
    small: normalize(13.5),
    x_small: normalize(12.5),
    xx_small: normalize(11.5),
    xxx_small: normalize(10)
}

export const CATEGORIES = [
    { label: 'Burgery', value: 'burgers' },
    { label: 'Fast Food', value: 'fastFood' },
    { label: 'Fit', value: 'fit' },
    { label: 'Mlsání', value: 'candies' },
    { label: 'Oběd', value: 'lunch' },
    { label: 'Párty', value: 'party' },
    { label: 'Pizza', value: 'pizza' },
    { label: 'Steaky', value: 'steaks' },
    { label: 'Snídaně', value: 'breakfast' },
    { label: 'Večeře', value: 'dinner' },
    { label: 'Vegan', value: 'vegan' }
]

export const CUISINES = [
    { label: 'Americká', value: 'american' },
    { label: 'Vietnamská', value: 'vietnam' },
    { label: 'Česká', value: 'czech' },
    { label: 'Indická', value: 'indian' },
    { label: 'Italská', value: 'italian' },
    { label: 'Mexická', value: 'mexican' },
    { label: 'Řecká', value: 'greek' },
    { label: 'Slovenská', value: 'slovak' },
    { label: 'Thajská', value: 'thai' }
]

export const CUSINES_FLAGS = {
    'american': require('../assets/flags/us.png'),
    'vietnam' : require('../assets/flags/vn.png'),
    'czech' : require('../assets/flags/cz.png'),
    'indian' : require('../assets/flags/in.png'),
    'italian' : require('../assets/flags/it.png'),
    'mexican' : require('../assets/flags/mx.png'),
    'greek' : require('../assets/flags/gr.png'),
    'slovak' : require('../assets/flags/sk.png'),
    'thai' : require('../assets/flags/th.png'),
}