#! /usr/bin/env node

console.log('This script populates some tiposDeQuarto, hoteis and quartosInstance to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var quartoInstance = require('./models/quartoinstance');
var TipoDeQuarto = require('./models/tipoDeQuarto');
var Hotel = require('./models/hotel');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var MongoClient = require('mongodb').MongoClient;
var tiposDeQuarto = []
var hoteis = []
var quartosInstance = []

function tipoQuartoCreate(tipo,nQuarto, servicos, precoEpocaAlta, precoEpocaBaixa, cb) {
  tipoQuartoDetail = {tipo: tipo, nQuarto: nQuarto, servicos: servicos, precoEpocaAlta: precoEpocaAlta, precoEpocaBaixa: precoEpocaBaixa}
  
  var tipoQuarto = new TipoDeQuarto(tipoQuartoDetail);
       
  tipoQuarto.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New tipoQuarto: ' + tipoQuarto);
    tiposDeQuarto.push(tipoQuarto)
    cb(null, tipoQuarto)
  }  );
}

function hotelCreate(nome, morada, mail, coordenadas, telefone, ntotal, quarto, descricao, servicos, imagens, cb) {
  hotelDetail = {nome: nome, morada: morada, mail: mail, coordenadas: coordenadas, 
    telefone: telefone, ntotal: ntotal, quarto: quarto, descricao: descricao, servicos: servicos,imagens: imagens}
  var hotel = new Hotel(hotelDetail);

  hotel.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New hotel: ' + hotel);
    hoteis.push(hotel)
    cb(null, hotel);
  }   );
}

function quartoInstanceCreate(quarto, status, dataInicio, dataFinal, cb) {
  quartoDetail = {
    quarto: quarto,
    status: status,
    dataInicio: dataInicio,
    dataFinal: dataFinal
  }
  var quartoinstance = new quartoInstance(quartoDetail);    
  quartoinstance.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
      console.log('New quarto: ' + quartoinstance);
      quartosInstance.push(quartoinstance)
      cb(null, quartoinstance)
    
    
  }  );
}

function createTiposDeQuarto(cb) {
  async.series([
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televisão LED', 'Canais por cabo', 'Mini-bar', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos',
        'Fechadura eletrónica de segurança', 'Roupão e chinelos', 'Maquina de café']
        tipoQuartoCreate('Standard', 3, servicos, 270, 180, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televisão LED', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos',
        'Fechadura eletrónica de segurança', 'Sala-de-estar', 'Roupão e chinelos', 'Maquina de café']
        tipoQuartoCreate('Suíte', 1, servicos, 330, 250, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televisão LED', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos',
        'Serviço de quarto 24 horas', 'Fechadura eletrónica de segurança', 'Sala-de-estar', 'Roupão e chinelos', 'Maquina de café']
        tipoQuartoCreate('Suíte Duplex', 1 ,servicos, 350, 270, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televisão LED', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos',
        'Serviço de quarto 24 horas', 'Fechadura eletrónica de segurança', 'Sala-de-estar', 'Roupão e chinelos', 'Maquina de café']
        tipoQuartoCreate('Suíte Deluxe', 1,servicos, 450, 310, callback);
      },  
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Mini-bar', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Produtos de higiene pessoal gratuitos',
        'Fechadura eletrónica de segurança', 'Serviço de quarto 24 horas', 'Chaleira']
        tipoQuartoCreate('Standard', 182,servicos, 160, 90, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Mini-bar', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Produtos de higiene pessoal gratuitos',
        'Fechadura eletrónica de segurança', 'Serviço de quarto 24 horas', 'Sala-de-estar', 'Chaleira']
        tipoQuartoCreate('Suíte Junior',  5 ,servicos, 180, 120, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Produtos de higiene pessoal gratuitos',
        'Fechadura eletrónica de segurança', 'Serviço de quarto 24 horas', 'Sala-de-estar', 'Varanda', 'Chaleira']
        tipoQuartoCreate('Suíte Junior Superior', 15, servicos, 210, 130, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi grátis', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de Higiene Pessoal Gratuitos',
        'Kitchenette', 'Fechadura Eletrónica de segurança', 'Serviço de Quarto 24 horas', 'Frigorífico', 'Micro-ondas', 'Chaleira']
        tipoQuartoCreate('Standard', 114, servicos, 210, 70, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi grátis', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de Higiene Pessoal Gratuitos',
        'Kitchenette', 'Fechadura Eletrónica de segurança', 'Serviço de Quarto 24 horas', 'Varanda', 'Frigorífico', 'Micro-ondas', 'Sala-de-estar', 'Chaleira']
        tipoQuartoCreate('Suíte Junior', 98, servicos, 250, 90, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi grátis', 'Ar condicionado', 'Televisão LCD', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de Higiene Pessoal Gratuitos',
        'Kitchenette', 'Fechadura Eletrónica de segurança', 'Serviço de Quarto 24 horas', 'Sala-de-estar', 'Sofá-cama', 'Varanda', 'Frigorífico', 'Micro-ondas', 'Chaleira']
        tipoQuartoCreate('Suíte Sénior', 8, servicos, 240, 120, callback);
      }
      ],
      // optional callback
      cb);
}

function createquartosInstance(cb) {
  async.series([ 
      function(callback) {
        for (i = 0; i < 2; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[0], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[0],'Available',null,null, callback);
      },
      function(callback) {
        quartoInstanceCreate(tiposDeQuarto[1],'Available', null, null, callback);
      },
      function(callback) {
        quartoInstanceCreate(tiposDeQuarto[2],'Available', null, null, callback);
      },
      function(callback) {
        quartoInstanceCreate(tiposDeQuarto[3],'Available', null, null, callback);
      },
      function(callback) {
        for (i = 0; i < 181; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[4], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[4], 'Available', null, null, callback);
      },
      function(callback) {
        for (i = 0; i < 4; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[5], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[5], 'Available', null, null, callback);
      },
      function(callback) {
        for (i = 0; i < 14; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[6], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[6], 'Available', null, null, callback);
      },
    
      function(callback) {
        for (i = 0; i < 113; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[7], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[7], 'Available', null, null, callback);
      },
      function(callback) {
        for (i = 0; i < 97; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[8], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[8], 'Available', null, null, callback);
      },
      function(callback) {
        for (i = 0; i < 7; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[9], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[9], 'Available', null, null, callback);
      }
    ],
    // optional callback
    cb);
}

function createHotel(cb) {
    async.series([
      function(callback) {
        var morada = 'Hotel Douro Vinhas, Quinta do Moreira – Marmelal, 5110-672 Armamar, Portugal'
        var quarto = [tiposDeQuarto[0], tiposDeQuarto[1], tiposDeQuarto[2], tiposDeQuarto[3]]
        var descricao = 'Com uma vista de cortar o fôlego para o Rio Douro e para o Rio Tedo, é no coração do Douro Vinhateiro que surge o Hotel Douro Vinhas. Com uma forte componente de agro e enoturismo, esta unidade estende-se pela centenária Quinta do Moreira.\n' + 
        'Na margem sul do Douro, perto da pitoresca aldeia do Marmelal, a propriedade que acolhe o Hotel Douro Vinhas fica muito próxima de um dos dois marcos mandados construir pelo Marquês de Pombal em 1757. Classificados como imóveis de interesse público, serviam\n' + 
        'para demarcar a zona dos vinhos generosos do Douro, à época sob jurisdição da Companhia Geral da Agricultura das Vinhas Douro. Nascia assim a primeira região demarcada de vinhos do mundo. Hoje, os vinhedos em socalcos tornam única a paisagem que rodeia esta unidade.\n' +
        'Numa primeira fase com apenas sete quartos, o Hotel Douro Vinhas distingue-se pela localização, pelo charme e pela exclusividade. Aqui poderá desfrutar da calma e do silêncio, do cenário, mas também a piscina exterior, da gastronomia regional do restaurante Moreira,\n' + 
        'cujos grandes janelões permitem admirar a envolvente. Mas também das visitas à adega e provas de vinhos do Porto, produzidos no local. Poderá ainda aproveitar para passear entre as vinhas, pelo olival ou pelo amendoal (particularmente bonito durante as amendoeiras em flor),\n' +
        'sempre com o Tedo e o Douro como companhia. Para completar a estadia, faça um cruzeiro fluvial, visite as quintas vinícolas da região ou faça um passeio de comboio. Ver as amendoeiras em flor ou participar nas vindimas são outras sugestões.'
        var servicos = ['Adega Moreira', 'Acesso gratuito à internet via wi-fi', 'Serviço de lavandaria', 'Acessos para pessoas com mobilidade reduzida', 'Receção 24 horas', 'Biblioteca']
        var imagens = ['public/images/Hotel1/1.jpg', 'public/images/Hotel1/2.jpg', 'public/images/Hotel1/3.jpg', 'public/images/Hotel1/4.jpg', 'public/images/Hotel1/5.jpg', 'public/images/Hotel1/6.jpg', 'public/images/Hotel1/7.jpg', 'public/images/Hotel1/8.jpg', 'public/images/Hotel1/9.jpg', 'public/images/Hotel1/10.jpg']
        hotelCreate('Douro Vinhas', morada, 'dourovinhas@hoteispsi.com', '41°09\'26.0"N 7°38\'26.0"W', '(+351) 254 249 000', 6, quarto, descricao, servicos, imagens, callback);
      },
      function(callback) {
        var morada = 'Hotel A Ver o Mar, Largo dos Navegantes, 2655-320 Ericeira, PORTUGAL'
        var quarto = [tiposDeQuarto[4], tiposDeQuarto[5], tiposDeQuarto[6]]
        var descricao = 'Situado na pitoresca vila da Ericeira, mesmo em cima da praia, este hotel com história e tradição, que resulta da reabilitação do marcante Hotel de Turismo da Ericeira, tem como cenário o Oceano Atlântico.\n' +
        'A 30 minutos de Lisboa, com acesso direto por autoestrada, o hotel A Ver o Mar dispõe de quatro tipologias de quarto, destacando-se os que têm varanda e vista para o mar. Este hotel na Ericeira inclui um restaurante, dois bares, '+  
        'salas para eventos e reuniões empresariais, clube de crianças e parque infantil e um moderno clube de saúde com salas de massagens, jacuzzi, sauna, banho turco e ginásio.\n' +
        'Durante a sua estadia no hotel A Ver o Mar, não deixe de dar um mergulho nas duas piscinas para adultos, uma das quais de água salgada. Já as crianças vão adorar os escorregas aquáticos.\n' +
        'Partindo deste hotel na Ericeira, aventure-se a conhecer as praias da região. E saiba que se apreciar desportos de ondas, está em plena reserva mundial de surf, e palco de uma das etapas do circuito WSL World Tour que junta os ' +
        'melhores surfistas do mundo. Pode ainda visitar o Palácio Nacional de Mafra ou Sintra, a 20 minutos de distância do hotel A Ver o Mar, de carro.\n' +
        'No verão, a animação da vila aumenta graças a vários festivais, entre os quais um dedicado exclusivamente à música reggae.'
        var servicos = ['Jardins e espaços exteriores', 'Piscina exterior para adultos e crianças', 'Acesso gratuito à internet via wi-fi', 'Parque de estacionamento', 
                        'Nep Kids Club', 'Parque infantil', 'Sala de jogos', 'Serviço de lavandaria', 'Acessos para pessoas com mobilidade reduzida', 'Clube de saúde', 'Receção 24 horas']
        var imagens = ['public/images/Hotel2/1.jpg', 'public/images/Hotel2/2.jpg', 'public/images/Hotel2/3.jpg', 'public/images/Hotel2/4.jpg', 'public/images/Hotel2/5.jpg', 'public/images/Hotel2/6.jpg', 'public/images/Hotel2/7.jpg', 'public/images/Hotel2/8.jpg', 'public/images/Hotel2/9.jpg', 'public/images/Hotel2/10.jpg']
        hotelCreate('A Ver o Mar', morada, 'averomar@hoteispsi.com', '38°57\'56.0"N 9°25\'09.0"W', '(+351) 261 869 700', 202, quarto, descricao, servicos, imagens, callback);
      },
      function(callback) {
        var morada = 'Hotel Mediterrâneo, Praia da Galé, 8200-995 Albufeira, PORTUGAL'
        var quarto = [tiposDeQuarto[7], tiposDeQuarto[8], tiposDeQuarto[9]]
        var descricao = 'Encontrará o Hotel Mediterrâneo mesmo junto à praia e apenas a cinco minutos do centro de Albufeira, no Algarve.\n' +
        'Este hotel em Albufeira oferece quartos modernos e amplos, dos quais se destacam os com vista para o mar ou as suítes. Todos têm kitchenette, sendo ideais para famílias com crianças.\n' + 
        'Conta ainda com um bar, um restaurante com buffet internacional e piscinas exteriores para adultos e crianças, prometendo dias de muito sol e animação. Tem ainda uma sala de jogos, parque infantil, clube de crianças com atividades ' +
        'para os mais novos e animadores próprios, spa com piscina interior, banho turco e jacuzzi, salas de massagem, ginásio e wi-fi gratuito em todas as zonas.\n' +
        'Durante a sua estadia aproveite para conhecer as irresistíveis praias de Albufeira, aventurar-se em desportos náuticos ou desfrutar das animadas ruas da cidade, repletas de bares, restaurantes e comércio, ou passear na marina.\n' +
        'Pode também visitar diferentes parques temáticos como o Zoomarine, Aqualand e Aquashow.'
        var servicos = ['Jardins e espaços exteriores', 'Piscina exterior para adultos e crianças', 'Acesso gratuito à internet via wi-fi', 'Parque de estacionamento', 
                        'Nep Kids Club', 'Parque infantil', 'Sala de jogos', 'Serviço de lavandaria', 'Acessos para pessoas com mobilidade reduzida', 'Clube de Saúde',
                        'Receção 24 horas', 'Lojas']
        var imagens = ['public/images/Hotel3/1.jpg', 'public/images/Hotel3/2.jpg', 'public/images/Hotel3/3.jpg', 'public/images/Hotel3/4.jpg', 'public/images/Hotel3/5.jpg', 'public/images/Hotel3/6.jpg','public/images/Hotel3/7.jpg', 'public/images/Hotel3/8.jpg', 'public/images/Hotel3/9.jpg', 'public/images/Hotel3/10.jpg']               
        hotelCreate('Mediterrâneo', morada, 'mediterraneo@hoteispsi.com', '37°04\'55.0"N 8°19\'03.0"W', '(+351) 289 570 700', 220, quarto, descricao, servicos, imagens, callback);
      }
      ],
      // Optional callback
      cb);
}

async.series([
  createTiposDeQuarto,
  createquartosInstance,
  createHotel
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Hóteis: ' + hoteis);     
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




