import { theme } from 'antd';

const { defaultAlgorithm, defaultSeed } = theme;

const customTheme = {
  algorithm: defaultAlgorithm,
  token: {
    // Primary color
    colorPrimary: '#FBD020',
    colorPrimaryHover: '#E6BB1E',
    colorPrimaryActive: '#D4AD1C',
    
    // Button styles
    fontFamily: '"Open Sans", sans-serif',
    colorTextLightSolid: '#000000', // Text color for primary buttons
    
    // Override button styles
    controlHeight: 40, // Large button height
    borderRadius: 20, // For rounded buttons
    
    // Typography
    fontSize: 16,
    lineHeight: 1,
    fontFamilyCode: '"Open Sans", sans-serif',
  },
  components: {
    Tag: {
      // Tag styles
      defaultBg: '#F5F5F5',
      defaultColor: 'rgba(0, 0, 0, 0.88)',
      colorPrimary: 'rgba(251, 208, 32, 0.1)',
      colorPrimaryHover: 'rgba(251, 208, 32, 0.2)',
      colorPrimaryActive: 'rgba(251, 208, 32, 0.3)',
      colorPrimaryBorder: 'transparent',
      colorPrimaryText: '#FBD020',
      colorText: '#FBD020',
      borderRadiusSM: 4,
      fontSize: 14,
      lineWidth: 1,
      lineType: 'solid',
      marginXS: 8,
      paddingXS: 8,
    },
    Button: {
      // Primary button styles
      primaryColor: '#fff',
      primaryShadow: 'none',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      textAlign: 'center',
      
      // Override hover and active states if needed
      primaryShadow: 'none',
      controlOutline: 'none',
      controlOutlineWidth: 0,
      
      // Button padding
      paddingInline: 46,
    },
  },
};

export default customTheme;
