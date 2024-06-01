import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Image,
} from 'react-native';
import {StyledText} from '../../../common/components/StyledComponents';
import {useMainContext} from '../../main.provider';
type AccordionData = {
  title: string;
  expanded: boolean;
  onHeaderPress: () => void;
  children: React.ReactNode;
};

function AccordionItem({
  children,
  title,
  expanded,
  onHeaderPress,
}: AccordionData): JSX.Element {
  const {isDarkMode} = useMainContext();
  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={onHeaderPress}>
        <StyledText isDarkMode={isDarkMode} style={styles.accordTitle}>
          {title}
        </StyledText>
        {expanded ? (
          isDarkMode ? (
            <Image
              source={require('../../../common/assets/images/chevron-up-white.png')}
              style={{height: 24, width: 24}}
            />
          ) : (
            <Image
              source={require('../../../common/assets/images/chevron-up-black.png')}
              style={{height: 24, width: 24}}
            />
          )
        ) : isDarkMode ? (
          <Image
            source={require('../../../common/assets/images/chevron-down-white.png')}
            style={{height: 24, width: 24}}
          />
        ) : (
          <Image
            source={require('../../../common/assets/images/chevron-down-black.png')}
            style={{height: 24, width: 24}}
          />
        )}
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
}

type AccordianDataItem = PropsWithChildren<{
  title: string;
  content: JSX.Element;
}>;

type AccordionProps = PropsWithChildren<{
  data: AccordianDataItem[];
}>;

function Accordion({data}: AccordionProps): JSX.Element {
  const [expandedIndex, setExpandedIndex] = useState<null | number>(null);

  function handleHeaderPress(index: number) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  return (
    <>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          expanded={expandedIndex === index}
          onHeaderPress={() => handleHeaderPress(index)}>
          {item.content}
        </AccordionItem>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  accordContainer: {
    paddingBottom: 4,
    width: '100%',
  },
  accordHeader: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    fontSize: 17,
  },
  accordBody: {
    padding: 12,
  },
});

export default Accordion;
