export const focusInputLastCharacter = ( refInput ) => {

    console.log( refInput );

    refInput.current.focus();

    refInput.current.selectionStart = refInput.current.value.length;

    refInput.current.selectionEnd = refInput.current.value.length;

};