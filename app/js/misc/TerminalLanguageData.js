
var variables = [
  [
    "On card",
    [
      ["OC_TRANS_NUMBER"           , 0],
      ["OC_BALANCE"                , 1],
      ["OC_CATEGORY"               , 2],
      ["OC_ACTIVATION"             , 3],
      ["OC_DAYS_FROM_VALIDITY_DATE", 4],
      ['OC_ID_ASCII_1'             , 71],
      ['OC_ID_ASCII_2'             , 72],
      ['OC_ID_ASCII_3'             , 73],
      ['OC_ID_ASCII_4'             , 74],
      ['OC_ID_ASCII_5'             , 75],
      ['OC_ID_ASCII_6'             , 76],
      ['OC_ID_ASCII_7'             , 77],
      ['OC_ID_ASCII_8'             , 78]

    ]
  ],

  [
    "On terminal",
    [
      ['OT_TRANS_NUMBER'        , 5],
      ['OT_PROVISION'           , 6],
      ['OT_SOLD'                , 7],
      ['OT_SUPER_ADD_SOLD'      , 8]
    ],
  ],

  [
    "Monthly user stats",
    [
      ['USM_TRANS_NUMBER'       , 9],
      ['USM_TRANS_NUMBER_ADD'   , 10],
      ['USM_TRANS_NUMBER_SUB'   , 11],
      ['USM_DATE_PERIOD_BEGIN'  , 12],
      ['USM_BALANCE_TOTAL_ADD'  , 13],
      ['USM_BALANCE_TOTAL_SUB'  , 14],
      ['USM_SOLD_AMOUNT'        , 68],

    ]
  ],

  [
    "Yearly user stats" ,
    [
      ['USY_TRANS_NUMBER'       , 15],
      ['USY_TRANS_NUMBER_ADD'   , 16],
      ['USY_TRANS_NUMBER_SUB'   , 17],
      ['USY_DATE_PERIOD_BEGIN'  , 18],
      ['USY_BALANCE_TOTAL_ADD'  , 19],
      ['USY_BALANCE_TOTAL_SUB'  , 20],
      ['USY_SOLD_AMOUNT'        , 69]
    ]
  ],

  [
    "All times user stats",
    [
      ['USE_TRANS_NUMBER'       , 21],
      ['USE_TRANS_NUMBER_ADD'   , 22],
      ['USE_TRANS_NUMBER_SUB'   , 23],
      ['USE_DATE_PERIOD_BEGIN'  , 24],
      ['USE_BALANCE_TOTAL_ADD'  , 25],
      ['USE_BALANCE_TOTAL_SUB'  , 26],
      ['USE_SOLD_AMOUNT'        , 70]
    ]
  ],

  [
    "Daily terminal stats",
    [
      ['TSD_TRANS_NUMBER'       , 27],
      ['TSD_TRANS_NUMBER_ADD'   , 28],
      ['TSD_TRANS_NUMBER_SUB'   , 29],
      ['TSD_DATE_PERIOD_BEGIN'  , 30],
      ['TSD_BALANCE_ADD'        , 31],
      ['TSD_BALANCE_SUB'        , 32]
    ]
  ],

  [
    "Monthly terminal stats",
    [
      ['TSM_TRANS_NUMBER'       , 33],
      ['TSM_TRANS_NUMBER_ADD'   , 34],
      ['TSM_TRANS_NUMBER_SUB'   , 35],
      ['TSM_DATE_PERIOD_BEGIN'  , 36],
      ['TSM_BALANCE_ADD'        , 37],
      ['TSM_BALANCE_SUB'        , 38]
    ]
  ],

  [
    "Yearly terminal stats",
    [
      ['TSY_TRANS_NUMBER'       , 39],
      ['TSY_TRANS_NUMBER_ADD'   , 40],
      ['TSY_TRANS_NUMBER_SUB'   , 41],
      ['TSY_DATE_PERIOD_BEGIN'  , 42],
      ['TSY_BALANCE_ADD'        , 43],
      ['TSY_BALANCE_SUB'        , 44]
    ]
  ],

  [
    "All times terminal stats",
    [
      ['TSE_TRANS_NUMBER'       , 45],
      ['TSE_TRANS_NUMBER_ADD'   , 46],
      ['TSE_TRANS_NUMBER_SUB'   , 47],
      ['TSE_DATE_PERIOD_BEGIN'  , 48],
      ['TSE_BALANCE_ADD'        , 49],
      ['TSE_BALANCE_SUB'        , 50]
    ]
  ],

  [
    "Other",
    [
      ['OTH_RANDOM_NUMBER_100'  , 51],
      ['OTH_DATE'               , 52],
      ['OTH_TIME'               , 53],
      ['OTH_DAY_IN_WEEK_MASK'   , 54]
    ]
  ],

  [
    "Trigger",
    [
      ['COUNT_DAY'              , 55],
      ['COUNT_MONTH'            , 56],
      ['COUNT_YEAR'             , 57],
      ['COUNT_EVER'             , 58]
    ]
  ],

  [
    "Generated value",
    [
      ['GDATA_0'                , 59],
      ['GDATA_1'                , 60],
      ['GDATA_2'                , 61],
      ['GDATA_3'                , 62],
      ['GDATA_4'                , 63]
    ]
  ],

  [
    "From transaction",
    [
      ['FT_EFFECTIVE_RATE'      , 64],
      ['FT_SOLD_TRANSACTION'    , 65],
      ['FT_CODE_TRANSACTION'    , 66],
      ['FT_PURCHASE_VALUE'      , 67]
    ]
  ],

  [
    "Value for test",
    [
      ['TEST_1'                 , 101],
      ['TEST_2'                 , 102],
      ['TEST_3'                 , 103],
      ['TEST_4'                 , 104],
      ['TEST_5'                 , 105]
    ]
  ]

];

var operations = [
  '+',
  '-',
  '*',
  '/',
  'm',
  '=',
  '>',
  ']',
  '<',
  '[',
  '!',
  '&',
  '|',
  'a',
  'o'
];

var logicalOperations = [
  'a',
  'o'
];

var operationTooltips = {
  'm': 'Modulo',
  ']': "More than or equal",
  '[': "Less than or equal",
  '!': "Not equal",
  '&': "Bit mask AND",
  '|': "Bit mask OR",
  'a': "AND",
  'o': 'OR'
};


var flattenVariables = function(variables) {
  var flattened = {};
  var i = 0;
  for(tot = variables.length; i < tot; i++) {
    var j = 0;
    varGroup = variables[i][1];
    for(totj = varGroup.length; j < totj; j++) {
      var key = "$" + varGroup[j][0];
      var val = "$" + varGroup[j][1];
      flattened[key] = val;
    }
  }
  return flattened;
}

var flattenedVariables = flattenVariables(variables);

module.exports = {
  variables:          variables,
  operations:         operations,
  logicalOperations:  logicalOperations,
  operationTooltips:  operationTooltips,
  flattenedVariables: flattenedVariables
}
