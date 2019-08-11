grammar GeoFencerExpression;

parse
 : expression EOF
 ;

expression
 : LPAREN expression RPAREN                                                                    #parenExpression
 | NOT expression                                                                              #notExpression
 | leftside=expression expressionoperator=comparator rightside=expression                      #comparatorExpression
 | leftside=expression expressionoperator=binary rightside=expression                          #binaryExpression
 | TEXTFIELD                                                                                   #textfieldExpression
 | PROP_START propertyKey=propKey PROP_END propertyOperator=comparator propertyValue=propValue #propExpression
 | bool                                                                                        #boolExpression
 | IDENTIFIER                                                                                  #identifierExpression
 | DECIMAL                                                                                     #decimalExpression
 | arrayoftext                                                                                 #arrayOfTextExpression
 ;

propKey
 : TEXTFIELD                                         #propKeyExpression
 ;


propValue
 : TEXTFIELD                                         #propValueExpression
 ;

comparator
 : GT | GE | LT | LE | EQ | LIKE | IN
 ;

binary
 : AND | OR
 ;

bool
 : TRUE | FALSE
 ;

arrayoftext
    : '[' TEXTFIELD (',' TEXTFIELD)* ']'
    | '[' ']'
    ;

AND        : 'AND' ;
OR         : 'OR' ;
NOT        : 'NOT';
TRUE       : 'TRUE' ;
FALSE      : 'FALSE' ;
GT         : '>' ;
GE         : '>=' ;
LT         : '<' ;
LE         : '<=' ;
EQ         : '=' ;
LIKE       : 'LIKE' ;
IN         : 'IN' ;
LPAREN     : '(' ;
RPAREN     : ')' ;
PROP_START : 'PROP[' ;
PROP_END   : ']' ;
DECIMAL    : '-'? [0-9]+ ( '.' [0-9]+ )? ;
IDENTIFIER : [a-zA-Z_] [a-zA-Z_0-9]* ;
TEXTFIELD  : '\'' ( ~['] )* '\'' ;


// TEXT       : '"' ( ~["] )*? '"' ;



// TEXT       : '"' ( ~["] )* '"' ;
WS         : [ \r\t\u000C\n]+ -> skip;






