
var OWL = OWL || {};

OWL.Individual = function( URI, classURI ){

    this.normalize = function( text ){
        if( text.charAt(0) != '#' )
            return '#' + text;
        return text;
    }

    this.URI = this.normalize( URI );
    this.classURI = classURI;
    this._datatypes = [];
    this._properies = [];
    this._sameAs = null;
    this._differentFrom = [];

    this.property = function(name, value){
        for( var i = 0; i < this._properies.length; i++ ){
            var p = this._properies[i];

            if( p.name == name ){
                p.value = value;
                return this;
            }
        }

        this._properies.push({
            name: name, value: value
        });
        return this;
    }

    this.differentFrom = function( value ){
        this._differentFrom.push( value );
        return this;
    }

    this.datatype = function(name, type, value){
        for( var i = 0; i < this._datatypes.length; i++ ){
            var d = this._datatypes[i];

            if( d.name == name ){
                d.type = type;
                d.value = value;
                return this;
            }
        }

        this._datatypes.push({
            name: name, type: type, value: value
        });
        return this;
    }

    this.sameAs = function( value ){
        this._sameAs = value;
        return this;
    }

    this.toString = function(){

        var xml = [];

        xml.push( '<owl:Thing rdf:about="' + this.URI + '">' );
        xml.push( '\t<rdf:type rdf:resource="' + this.classURI + '"/>' );

        for( var i = 0; i < this._properies.length; i++ ){
            var p = this._properies[i];

            xml.push( '\t<' + p.name + ' rdf:resource="' + p.value + '" />' );
        }

        for( var i = 0; i < this._datatypes.length; i++ ){
            var d = this._datatypes[i];

            xml.push( '\t<' + d.name + ' rdf:datatype="&xsd;' + d.type + '">' + d.value + '</' + d.name + '>' );
        }

        if( this._sameAs != null )
            xml.push( '\t<owl:sameAs rdf:resource="' + this._sameAs + '" />' );

        for( var i = 0; i < this._differentFrom.length; i++ ){
            var d = this._differentFrom[i];

            xml.push( '\t<owl:differentFrom rdf:resource="' + d + '" />' );
        }

        xml.push( '</owl:Thing>' );

        return xml.join( "\n" );

    }
}
