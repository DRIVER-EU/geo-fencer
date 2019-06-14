grammar GeoFencerExpression;

parse
 : expression EOF
 ;

expression
 : LPAREN expression RPAREN                       #parenExpression
 | NOT expression                                 #notExpression
 | leftside=expression expressionoperator=comparator rightside=expression #comparatorExpression
 | leftside=expression expressionoperator=binary rightside=expression     #binaryExpression
 | PROP_START propertyKey=propKey PROP_END propertyOperator=comparator propertyValue=propValue #propExpression
 | bool                                           #boolExpression
 | IDENTIFIER                                     #identifierExpression
 | DECIMAL                                        #decimalExpression
 | STRING                                         #stringExpression
 | arrayofstring                                    #arrayOfStringsExpression
 ;

propKey
 : PROPNAME                                         #propKeyExpression
 ;


propValue
 : PROPNAME                                         #propValueExpression
 ;

comparator
 : GT | GE | LT | LE | EQ | LIKE
 ;

binary
 : AND | OR
 ;

bool
 : TRUE | FALSE
 ;

arrayofstring
    : '[' STRING (',' STRING)* ']'
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
LPAREN     : '(' ;
RPAREN     : ')' ;
PROP_START : 'PROP[';
PROP_END   : ']';
PROPNAME   : '\'' ( ~['] )*? '\'' ;
DECIMAL    : '-'? [0-9]+ ( '.' [0-9]+ )? ;
IDENTIFIER : [a-zA-Z_] [a-zA-Z_0-9]* ;
/* STRING     : '\'' ([a-zA-Z_0-9])* '\'' ; */
STRING     : '\'' ( ~['] )*? '\'' ; 
WS         : [ \r\t\u000C\n]+ -> skip;